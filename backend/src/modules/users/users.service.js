const { HttpError } = require("../../shared/http-error");
const { isUuid } = require("../../shared/validators");
const { findUserById } = require("../auth/auth.repository");
const { toAdminUser } = require("./users.model");
const { listUsers, updateUserActive } = require("./users.repository");

const getAdminUserSelect = () => ({
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
});

const listAllUsers = async () => {
  const users = await listUsers(getAdminUserSelect());
  return users.map(toAdminUser);
};

const setUserActive = async (userId, isActive) => {
  if (!isUuid(userId)) {
    throw new HttpError(400, "Invalid user id.");
  }

  if (typeof isActive !== "boolean") {
    throw new HttpError(400, "Invalid user status.");
  }

  const existingUser = await findUserById(userId, { id: true });
  if (!existingUser) {
    throw new HttpError(404, "User not found.");
  }

  const updated = await updateUserActive(userId, isActive, getAdminUserSelect());
  return toAdminUser(updated);
};

module.exports = { listAllUsers, setUserActive };
