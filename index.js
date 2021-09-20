const contactsOperation = require("./contacts.js");
const asyncHandler = require("./utils/asyncHandler");

const { program } = require("commander");



program
    .option("-a, --action <type>", "action type")
    .option("-i, --id <type>", "contact id")
    .option("-n, --name <type>", "contact name")
    .option("-e, --email <type>", "contact email")
    .option("-p, --phone <type>", "contact phone");
program.parse(process.argv);

const options = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            let contacts = await asyncHandler(contactsOperation.listContacts());
            console.log(contacts);
            break;
        case "get":
            let contact = await asyncHandler(contactsOperation.getContactById(id));
            console.log(contact);
            break;
        case "add":
            await asyncHandler(contactsOperation.addContact(name, email, phone));
            console.log("new contact is added");
            break;
        case "remove":
            await asyncHandler(contactsOperation.removeContact(id));
            console.log(`contact id=${id} was removed`);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

invokeAction(options)



