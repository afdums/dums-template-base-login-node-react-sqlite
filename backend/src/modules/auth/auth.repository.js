const { prisma } = require("../../database");

const findUserByEmail = (email, select) =>
  prisma.user.findUnique({
    where: { email },
    select,
  });

const findUserById = (id, select) =>
  prisma.user.findUnique({
    where: { id },
    select,
  });

const createUser = (data, select) =>
  prisma.user.create({
    data,
    select,
  });

const createRefreshToken = (data) =>
  prisma.refreshToken.create({
    data,
  });

const findRefreshTokenByTokenId = (tokenId) =>
  prisma.refreshToken.findUnique({
    where: { tokenId },
  });

const revokeRefreshToken = (tokenId) =>
  prisma.refreshToken.updateMany({
    where: { tokenId, revokedAt: null },
    data: { revokedAt: new Date() },
  });

const revokeRefreshTokensByUserId = (userId) =>
  prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  createRefreshToken,
  findRefreshTokenByTokenId,
  revokeRefreshToken,
  revokeRefreshTokensByUserId,
};
