const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { HttpError } = require("../../shared/http-error");
const { toPublicUser } = require("./auth.model");
const {
  createUser,
  createRefreshToken,
  findRefreshTokenByTokenId,
  findUserByEmail,
  revokeRefreshToken,
} = require("./auth.repository");
const {
  signAccessToken,
  signRefreshToken,
  getTokenExpiry,
  verifyRefreshToken,
} = require("./auth.token.service");
const {
  normalizeEmail,
  normalizeName,
  normalizePassword,
  normalizeToken,
} = require("./auth.validation");

const createTokenId = () =>
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : crypto.randomBytes(16).toString("hex");

const issueTokens = async (userId) => {
  const tokenId = createTokenId();
  const refreshToken = signRefreshToken(userId, tokenId);
  const expiresAt = getTokenExpiry(refreshToken);

  await createRefreshToken({
    tokenId,
    userId,
    expiresAt,
  });

  return {
    accessToken: signAccessToken(userId),
    refreshToken,
  };
};

const register = async (payload) => {
  const name = normalizeName(payload?.name);
  const email = normalizeEmail(payload?.email);
  const password = normalizePassword(payload?.password);

  if (!name || !email || !password) {
    throw new HttpError(400, "Missing required fields.");
  }

  const existingUser = await findUserByEmail(email, { id: true });
  if (existingUser) {
    throw new HttpError(409, "Email already in use.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(
    { name, email, passwordHash },
    { id: true, name: true, email: true }
  );
  const tokens = await issueTokens(user.id);

  return { user: toPublicUser(user), tokens };
};

const login = async (payload) => {
  const email = normalizeEmail(payload?.email);
  const password = normalizePassword(payload?.password);

  if (!email || !password) {
    throw new HttpError(400, "Missing required fields.");
  }

  const user = await findUserByEmail(email, {
    id: true,
    name: true,
    email: true,
    passwordHash: true,
  });

  if (!user) {
    throw new HttpError(401, "Invalid credentials.");
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    throw new HttpError(401, "Invalid credentials.");
  }

  const tokens = await issueTokens(user.id);

  return { user: toPublicUser(user), tokens };
};

const refresh = async (payload) => {
  const refreshToken = normalizeToken(payload?.refreshToken);
  if (!refreshToken) {
    throw new HttpError(400, "Missing refresh token.");
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded || typeof decoded === "string") {
    throw new HttpError(401, "Invalid refresh token.");
  }

  const tokenId = decoded.tid;
  const userId = Number(decoded.sub);

  if (!tokenId || !Number.isInteger(userId)) {
    throw new HttpError(401, "Invalid refresh token.");
  }

  const storedToken = await findRefreshTokenByTokenId(tokenId);
  if (!storedToken || storedToken.revokedAt) {
    throw new HttpError(401, "Invalid refresh token.");
  }

  if (storedToken.userId !== userId) {
    throw new HttpError(401, "Invalid refresh token.");
  }

  if (storedToken.expiresAt <= new Date()) {
    throw new HttpError(401, "Refresh token expired.");
  }

  await revokeRefreshToken(tokenId);

  return issueTokens(userId);
};

module.exports = { register, login, refresh };
