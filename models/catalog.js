const fs = require('fs/promises');
const path = require('path');
// const contactsPath = path.join(__dirname, "./contacts.json");

const getCatalog = async catalogId => {
    const contactsPath = path.join(__dirname, `./catalog${catalogId}.json`);
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getProduct = async (catalogId, productId) => {
    const catalog = await getCatalog(catalogId);
    const result = catalog.find(({ id }) => id === productId);
    return result;
};

module.exports = { getCatalog, getProduct };
