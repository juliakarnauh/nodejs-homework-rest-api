const Joi = require("joi");
const userSchema = Joi.object({
password: Joi.string().min(6).required(),
email: Joi.string().email().required(),
})

module.exports = {
    userSchema
}