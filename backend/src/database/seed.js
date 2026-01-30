const bcrypt = require("bcryptjs");
const { prisma } = require("./");

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const normalizeName = (value) =>
  typeof value === "string" ? value.trim() : "";

const seedAdminUser = async () => {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  if (existingAdmin) {
    return;
  }

  const email = normalizeEmail(process.env.SEED_ADMIN_EMAIL);
  const password = process.env.SEED_ADMIN_PASSWORD || "";
  const name = normalizeName(process.env.SEED_ADMIN_NAME) || "Admin";

  if (!email || !password) {
    console.warn(
      "Seed admin skipped. Configure SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    select: { id: true },
  });

  console.info("Seed admin created.");
};

module.exports = { seedAdminUser };
