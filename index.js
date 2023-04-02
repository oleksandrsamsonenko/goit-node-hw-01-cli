const contactService = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactService.listContacts();
      return console.table(contactsList);

    case "get":
      const contact = await contactService.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const removedContact = await contactService.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
