const cors = require("cors");
const express = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const { healthRouter } = require("./modules/health/health.routes");
const { usersRouter } = require("./modules/users/users.routes");

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", healthRouter);
app.use("/", usersRouter);

module.exports = { app };
