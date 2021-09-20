const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
};


async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
};


async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id.toString() === contactId);
    if (!contact) return null;
    return contact;
};



async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
        return null;
    };
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
};

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: nanoid() };
    const updateContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    return newContact;
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,

}