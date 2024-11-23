const express = require("express");
const { getContacts, addContact } = require("../controllers/contactController.js");

const router = express.Router();

router.get("/", getContacts);

router.post("/", addContact);

module.exports = router;
