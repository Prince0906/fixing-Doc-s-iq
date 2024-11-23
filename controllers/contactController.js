const { getAllContacts, createContact } = require("../models/contactModel.js");

const getContacts = async (req, res) => {
    try {
        const [rows] = await getAllContacts();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching contacts:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addContact = async (req, res) => {
    try {
        const contactData = req.body;
        await createContact(contactData);
        res.status(201).json({ message: "Contact created successfully!" });
    } catch (error) {
        console.error("Error adding contact:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getContacts,
    addContact,
};
