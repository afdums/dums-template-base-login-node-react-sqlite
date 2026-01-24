const { listAllUsers, setUserActive } = require("./users.service");

const handleError = (res, error) => {
  if (error?.status) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error("Admin users request failed.", error);
  return res.status(500).json({ error: "Unexpected error." });
};

const listUsersController = async (req, res) => {
  try {
    const users = await listAllUsers();
    return res.json({ users });
  } catch (error) {
    return handleError(res, error);
  }
};

const setUserActiveController = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const isActive = req.body?.isActive;
    const user = await setUserActive(userId, isActive);
    return res.json({ user });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = { listUsersController, setUserActiveController };
