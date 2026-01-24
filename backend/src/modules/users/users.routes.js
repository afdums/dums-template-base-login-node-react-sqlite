const { Router } = require("express");
const { authGuard, adminGuard } = require("../auth/auth.middleware");
const {
  listUsersController,
  setUserActiveController,
} = require("./users.controller");

const router = Router();

router.get("/admin/users", authGuard, adminGuard, listUsersController);
router.patch(
  "/admin/users/:userId/active",
  authGuard,
  adminGuard,
  setUserActiveController
);

module.exports = { usersRouter: router };
