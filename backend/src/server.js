require("./config/env");

const { app } = require("./app");
const { connect, disconnect } = require("./database");
const { seedAdminUser } = require("./database/seed");
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect();
    await seedAdminUser();

    const server = app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });

    const shutdown = async () => {
      await disconnect();
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Database connection failed.", error);
    process.exit(1);
  }
};

start();
