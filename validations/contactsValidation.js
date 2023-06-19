const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
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
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const missingField = error.details[0].context.label;
    const errorMessage = `Missing ${missingField} field`;
    res.status(400).json({ message: errorMessage });
  } else {
    next();
  }
};

exports.validateUpdateFavorite = (req, res, next) => {
  const { error } = contactUpdateFavoriteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};
