const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next({ status: 404, message: `${contactId} not a valid id format` });
  }
  next();
};

module.exports = isValidId;
