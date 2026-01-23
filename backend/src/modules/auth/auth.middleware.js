const { HttpError } = require("../../shared/http-error");
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

const authGuard = (req, res, next) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Missing token." });
  }

  try {
    const decoded = verifyAccessToken(token);
    if (decoded && typeof decoded !== "string") {
      const userId = Number(decoded.sub);
      if (Number.isInteger(userId)) {
        req.auth = { userId, tokenType: "access" };
        return next();
      }
    }
    throw new HttpError(401, "Invalid access token.");
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = { authGuard };
