const Joi = require("joi");
const userRegisterSchema = Joi.object({
password: Joi.string().min(6).required(),
email: Joi.string().email().required(),
subscription: Joi.string().required(),
})
const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})
module.exports = {
    userRegisterSchema,
    userLoginSchema,
}