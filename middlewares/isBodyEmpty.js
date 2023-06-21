const isBodyEmpty = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }
  next();
};

module.exports = isBodyEmpty;
