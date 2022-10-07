const path = require('path');

const getPath = fileName => {
    return path.join(__dirname, `/${fileName}`);
};

module.exports = getPath;
