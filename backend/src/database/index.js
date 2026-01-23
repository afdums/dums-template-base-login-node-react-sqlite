const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connect = () => prisma.$connect();
const disconnect = () => prisma.$disconnect();

module.exports = { prisma, connect, disconnect };
