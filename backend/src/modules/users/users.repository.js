const { prisma } = require("../../database");

const listUsers = (select) =>
  prisma.user.findMany({
    select,
    orderBy: { createdAt: "desc" },
  });

const updateUserActive = (userId, isActive, select) =>
  prisma.user.update({
    where: { id: userId },
    data: { isActive },
    select,
  });

module.exports = { listUsers, updateUserActive };
