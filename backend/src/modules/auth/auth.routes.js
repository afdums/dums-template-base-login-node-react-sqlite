const { Router } = require("express");
const {
  registerController,
  loginController,
  refreshController,
} = require("./auth.controller");

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);

module.exports = { authRouter: router };
