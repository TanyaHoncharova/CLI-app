const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid')

const listContacts = require("./listContacts");
const contactsPath = path.join(__dirname, "../../db/contacts.json");


const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: nanoid() };
    const updateContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    return newContact;
};


module.exports = addContact
