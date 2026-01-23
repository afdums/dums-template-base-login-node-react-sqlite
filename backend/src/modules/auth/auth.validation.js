const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const normalizeName = (value) => (typeof value === "string" ? value.trim() : "");

const normalizePassword = (value) =>
  typeof value === "string" ? value : "";

const normalizeToken = (value) =>
  typeof value === "string" ? value.trim() : "";

module.exports = {
  normalizeEmail,
  normalizeName,
  normalizePassword,
  normalizeToken,
};
