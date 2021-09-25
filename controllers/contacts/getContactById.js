const fs = require("fs/promises");
const path = require("path");
const listContacts = require("./listContacts");

const contactsPath = path.join(__dirname, "../../db/contacts.json");

async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id.toString() === contactId);
    if (!contact) return null;
    return contact;
}

module.exports = getContactById