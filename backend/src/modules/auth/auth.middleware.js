const { HttpError } = require("../../shared/http-error");
const { findUserById } = require("./auth.repository");
const { verifyAccessToken } = require("./auth.token.service");

const getBearerToken = (req) => {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    return "";
  }
  return token.trim();
};

const sendError = (res, error) => {
  if (error?.status) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error("Auth guard failed.", error);
  return res.status(500).json({ error: "Unexpected error." });
};

const authGuard = async (req, res, next) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Missing token." });
  }

  try {
    const decoded = verifyAccessToken(token);
    if (decoded && typeof decoded !== "string") {
      const userId = Number(decoded.sub);
      if (Number.isInteger(userId)) {
        const user = await findUserById(userId, { id: true, isActive: true });
        if (!user) {
          throw new HttpError(401, "Invalid access token.");
        }

        if (!user.isActive) {
          throw new HttpError(403, "User is inactive.");
        }

        req.auth = { userId, tokenType: "access" };
        return next();
      }
    }
    throw new HttpError(401, "Invalid access token.");
  } catch (error) {
    return sendError(res, error);
  }
};

const adminGuard = async (req, res, next) => {
  if (!req.auth?.userId) {
    return res.status(401).json({ error: "Missing authentication." });
  }

  try {
    const user = await findUserById(req.auth.userId, {
      id: true,
      role: true,
      isActive: true,
    });

    if (!user) {
      throw new HttpError(401, "Invalid access token.");
    }

    if (!user.isActive) {
      throw new HttpError(403, "User is inactive.");
    }

    if (user.role !== "ADMIN") {
      throw new HttpError(403, "Admin privileges required.");
    }

    req.auth.role = user.role;
    return next();
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = { authGuard, adminGuard };

