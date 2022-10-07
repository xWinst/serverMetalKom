const fs = require('fs/promises');
const path = require('path');
// const contactsPath = path.join(__dirname, "./contacts.json");

const getCatalog = async catalogId => {
    const contactsPath = path.join(__dirname, `./catalog${catalogId}.json`);
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getAllCategories = async () => {
    const catalog1 = await getCatalog(1);
    const catalog2 = await getCatalog(2);
    const catalog3 = await getCatalog(3);
    const catalog4 = await getCatalog(4);
    return [catalog1, catalog2, catalog3, catalog4];
};

const getProduct = async (catalogId, productId) => {
    const catalog = await getCatalog(catalogId);
    const result = catalog.find(({ id }) => id === productId);
    return result;
};

module.exports = { getCatalog, getProduct, getAllCategories };
