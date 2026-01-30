const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const envPath = path.join(rootDir, ".env");
const envExamplePath = path.join(rootDir, ".env.example");

const run = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const ensureEnv = () => {
  if (fs.existsSync(envPath)) {
    return;
  }

  if (!fs.existsSync(envExamplePath)) {
    console.error("Arquivo .env.example nao encontrado.");
    process.exit(1);
  }

  fs.copyFileSync(envExamplePath, envPath);
  console.log("Arquivo .env criado a partir do .env.example.");
};

const runSeed = async () => {
  require("../src/config/env");
  const { connect, disconnect } = require("../src/database");
  const { seedAdminUser } = require("../src/database/seed");

  await connect();
  await seedAdminUser();
  await disconnect();
};

const main = async () => {
  ensureEnv();
  run("npx", ["prisma", "migrate", "deploy"]);
  run("npx", ["prisma", "generate"]);
  await runSeed();
};

main().catch((error) => {
  console.error("Init failed.", error);
  process.exit(1);
});
