const jwt = require("jsonwebtoken");
const { HttpError } = require("../../shared/http-error");

const getAuthConfig = () => {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new HttpError(500, "JWT secrets are not configured.");
  }

  return {
    accessSecret,
    refreshSecret,
    accessTtl: process.env.JWT_ACCESS_TTL || "15m",
    refreshTtl: process.env.JWT_REFRESH_TTL || "7d",
  };
};

const signAccessToken = (userId) => {
  const { accessSecret, accessTtl } = getAuthConfig();
  return jwt.sign({ sub: String(userId) }, accessSecret, { expiresIn: accessTtl });
};

const signRefreshToken = (userId, tokenId) => {
  const { refreshSecret, refreshTtl } = getAuthConfig();
  return jwt.sign(
    { sub: String(userId), tid: tokenId },
    refreshSecret,
    { expiresIn: refreshTtl }
  );
};

const getTokenExpiry = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded?.exp) {
    throw new HttpError(500, "Unable to read token expiry.");
  }
  return new Date(decoded.exp * 1000);
};

const verifyRefreshToken = (token) => {
  const { refreshSecret } = getAuthConfig();

  try {
    return jwt.verify(token, refreshSecret);
  } catch (error) {
    throw new HttpError(401, "Invalid refresh token.");
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  getTokenExpiry,
  verifyRefreshToken,
};
