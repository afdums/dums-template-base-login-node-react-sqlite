const getHealth = (req, res) => {
  res.json({ status: "ok", auth: req.auth || null });
};

module.exports = { getHealth };
