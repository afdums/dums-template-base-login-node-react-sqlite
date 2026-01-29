const { register, login, refresh, logout, logoutAll } = require("./auth.service");

const handleError = (res, error) => {
  if (error?.status) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error("Auth request failed.", error);
  return res.status(500).json({ error: "Unexpected error." });
};

const registerController = async (req, res) => {
  try {
    const result = await register(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const loginController = async (req, res) => {
  try {
    const result = await login(req.body);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const refreshController = async (req, res) => {
  try {
    const tokens = await refresh(req.body);
    return res.json({ tokens });
  } catch (error) {
    return handleError(res, error);
  }
};

const logoutController = async (req, res) => {
  try {
    const result = await logout(req.body);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const logoutAllController = async (req, res) => {
  try {
    const result = await logoutAll(req.auth?.userId);
    return res.json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  registerController,
  loginController,
  refreshController,
  logoutController,
  logoutAllController,
};
