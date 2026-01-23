const express = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const { healthRouter } = require("./modules/health/health.routes");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/", healthRouter);

module.exports = { app };
