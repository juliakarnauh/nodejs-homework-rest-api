const isBodyEmpty = async (req, res, next) => {
    if (!req.body || !Object.keys(req.body).length) {
     next({ status: 400, message: "Missing fields" });
    }
    next();
  };
  

module.exports = isBodyEmpty;