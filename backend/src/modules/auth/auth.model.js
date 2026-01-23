const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

module.exports = { toPublicUser };
