const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

exports.validateAddContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const missingField = error.details[0].context.label;
    const errorMessage = `Missing required ${missingField} field`;
    res.status(400).json({ message: errorMessage });
  } else {
    next();
  }
};

exports.validateUpdateContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing fields" });
  } else {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      const errorMessage = `Missing ${missingField} field`;
      res.status(400).json({ message: errorMessage });
    } else {
      next();
    }
  }
};