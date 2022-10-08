const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const fileUpload = require('express-fileupload');
const emailRouter = require('./routes/api/email');
const catalogRouter = require('./routes/api/catalogs');
const downloadsRouter = require('./routes/api/downloads');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(fileUpload({ createParentPath: true }));

app.use('/api/email', emailRouter);
app.use('/api/catalogs', catalogRouter);
app.use('/api/downloads', downloadsRouter);
app.use('/images', express.static('./images'));

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

module.exports = app;
