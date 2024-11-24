const {getPrimaryViaEmail,
    getPrimaryViaPhoneNumber,
    mergePrimaries,
    addContact,
    getLinkedContacts
} = require("../models/contactModel");


const contactInserter = async (contact) => {
    const emailLinkedContact = contact.email ? await getPrimaryViaEmail(contact.email) : null;

    const phoneNumberLinkedContact = contact.phoneNumber ? await getPrimaryViaPhoneNumber(contact.phoneNumber) : null;

    // if only email or phoneNumber provided and there linked contact is also there
    if ((contact.email && emailLinkedContact && !contact.phoneNumber) || 
    (contact.phoneNumber && phoneNumberLinkedContact && !contact.email)) {
        return;
    }

    // if both things provided and id is matching
    if (contact.email && emailLinkedContact && contact.phoneNumber && phoneNumberLinkedContact) {
        if (emailLinkedContact.id === phoneNumberLinkedContact.id) {
            return;
    }

    // merge case
    console.log(emailLinkedContact.createdAt)
    if (emailLinkedContact.createdAt < phoneNumberLinkedContact.createdAt) {
        await mergePrimaries(emailLinkedContact.id,phoneNumberLinkedContact.id);
        return;
    }
    await mergePrimaries(phoneNumberLinkedContact.id,emailLinkedContact.id);
    return;
    }

    await addContact({
        ...contact,
        linkedId: emailLinkedContact?.id || phoneNumberLinkedContact?.id,
    });
};

const contactReader = async (contact) => {
    return await getLinkedContacts(contact);
};
  
module.exports = { contactInserter,contactReader };
  