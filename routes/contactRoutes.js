const express = require("express");
const {contactInserter, contactReader} = require("../controllers/contactController");

const router = express.Router();

const removeUndefinedAndNulls = (arr) => {
    return arr.filter((item) => item != undefined);
};
  
const removeDuplicatesInPlace = (arr) => {
    return Array.from(new Set(arr));
};

router.post("/identify", async (req, res) => {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
        res.status(400).send("email or phoneNumber is required");
        return;
    }

    await contactInserter({ email, phoneNumber });
    const contacts = await contactReader({ email, phoneNumber });

    const result = {
        primaryContactId: contacts[0].id,
        emails: removeDuplicatesInPlace(
            removeUndefinedAndNulls(contacts.map((contact) => contact.email)),
        ),
        phoneNumbers: removeDuplicatesInPlace(
            removeUndefinedAndNulls(contacts.map((contact) => contact.phoneNumber)),
        ),
        secondaryContactIds: contacts.slice(1).map((contact) => contact.id),
    };
  
    res.status(200).send({
        contact: result,
    });
  });

module.exports = router;
