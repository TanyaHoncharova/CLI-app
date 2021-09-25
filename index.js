const contactsOperation = require("./controllers/contacts");
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

asyncHandler(invokeAction(options))



// самовызывающаяся функция

// (async () => {
//     const { action, id, name, email, phone } = options;
//     switch (action) {
//         case "list":
//             let contacts = await asyncHandler(contactsOperation.listContacts());
//             console.log(contacts);
//             break;
//         case "get":
//             let contact = await asyncHandler(contactsOperation.getContactById(id));
//             console.log(contact);
//             break;
//         case "add":
//             await asyncHandler(contactsOperation.addContact(name, email, phone));
//             console.log("new contact is added");
//             break;
//         case "remove":
//             await asyncHandler(contactsOperation.removeContact(id));
//             console.log(`contact id=${id} was removed`);
//             break;
//         default:
//             console.warn('\x1B[31m Unknown action type!');
//     }
// })();




//проверка работоспособности функций шаг 3 из readme.md

// (async () => {
    // вывести список контактов  
    // const contacts = await asyncHandler(contactsOperation.listContacts());
    // console.log(contacts);

    // получить контакт по id
    // const contact = await asyncHandler(contactsOperation.getContactById("y-glqcgQz94smNonLZAe_"));
    // console.log(contact);

    // удалить контакт по id
    // console.log(await asyncHandler(contactsOperation.removeContact(9)));

    // добавить контакт
//     const newContact = {
//         name: "John Doe",
//         email: "est@utquamvel.net",
//         phone: "(692) 802-2949"
//     };
//     await asyncHandler(contactsOperation.addContact(newContact));
// })();
