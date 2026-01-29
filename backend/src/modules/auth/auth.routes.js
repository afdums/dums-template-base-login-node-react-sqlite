const { Router } = require("express");
const {
  registerController,
  loginController,
  refreshController,
  logoutController,
  logoutAllController,
} = require("./auth.controller");
const { authGuard } = require("./auth.middleware");

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);
router.post("/logout-all", authGuard, logoutAllController);

module.exports = { authRouter: router };
