const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contactsController");

const contactsValidation = require("../../validations/contactsValidation");

const {isBodyEmpty, isValidId} = require("../../middlewares/");
router.get("/", contactsController.listContacts);
router.get("/:contactId", isValidId, contactsController.getContactById);
router.post("/", isBodyEmpty, contactsValidation.validateAddContact, contactsController.addContact);
router.delete("/:contactId", isValidId,  contactsController.deleteContact);
router.patch("/:contactId/favorite", isValidId, contactsValidation.validateUpdateFavorite, contactsController.updateFavoriteContact);
router.put("/:contactId", isValidId, isBodyEmpty, contactsValidation.validateUpdateContact, contactsController.updateContact);

module.exports = router;