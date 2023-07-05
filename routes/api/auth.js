const express = require("express");
const authRouter = express.Router();
const authController = require("../../controllers/authController");
const { isBodyEmpty, authenticate } = require("../../middlewares");
const validateBody = require("../../decorators/validateBody")
const usersValidation = require("../../validations/usersValidation");

authRouter.post("/register", isBodyEmpty, validateBody(usersValidation.userSchema), authController.register);

authRouter.post("/login", isBodyEmpty, validateBody(usersValidation.userSchema), authController.login);

authRouter.post("/logout", authenticate, authController.logout );

authRouter.get("/current", authenticate, authController.current );

module.exports = authRouter;
