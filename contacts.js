const fs = require(`fs/promises`);
const path = require(`path`);
const { nanoid } = require(`nanoid`);

const contactsPath = path.resolve("db", "contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = data.splice(index, 1);
  await updateContacts(data);
  return result;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  const newList = [...data, newContact];
  await updateContacts(newList);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
