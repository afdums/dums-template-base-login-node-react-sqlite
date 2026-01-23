const { Router } = require("express");
const { authGuard } = require("../auth/auth.middleware");
const { getHealth } = require("./health.controller");

const router = Router();

router.get("/health", authGuard, getHealth);

module.exports = { healthRouter: router };
