const express = require("express");
const router = express.Router();
const contactsController = require("./contactsController");
const contactsValidation = require("./contactsValidation");

router.get("/", contactsController.listContacts);
router.get("/:contactId", contactsController.getContactById);
router.post("/", contactsValidation.validateAddContact, contactsController.addContact);
router.delete("/:contactId", contactsController.deleteContact);
router.put("/:contactId", contactsValidation.validateUpdateContact, contactsController.updateContact);

module.exports = router;