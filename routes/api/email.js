const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

let filePath, fileName;

router.post('/upload', async (req, res, next) => {
    const file = req.files.file;
    fileName = encodeURI(file.name);
    file.mv(`${__dirname}/upload/${fileName}`, err => {
        if (err) {
            console.error('err', err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/upload/${fileName}` });
        filePath = path.join(__dirname, `/upload/${fileName}`);
    });
    res.status(201).json({ messages: 'File upload' });
});

router.post('/', (req, res, next) => {
    const { name, email, phone, text } = req.body;
    const config = {
        host: 'smtp.ukr.net',
        port: 465,
        secure: true,

        auth: {
            user: 'hell_x@ukr.net',
            pass: process.env.PASSWORD,
        },
    };

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
        from: 'hell_x@ukr.net',
        to: 'hell_x@ukr.net, yura.rikov.93@gmail.com',
        subject: 'Нове повідомлення з сайту METALKOM',
        text: `
        Ім'я: ${name}\r\n
        Номер телефону: ${phone}\r\n
        Поштова скринька: ${email || 'клієнт не зазначив'}\r\n
        Текст повідомлення: ${text || 'клієнт не залишив повідомлення'}`,
    };

    console.log('filePath: ', filePath);
    console.log('fileName: ', fileName);
    if (fileName) {
        emailOptions.attachments = [
            {
                filename: decodeURI(fileName),
                content: fs.createReadStream(filePath),
            },
        ];
    }

    transporter
        .sendMail(emailOptions)
        .then(info => console.log('info', info))
        .catch(err => console.log('err', err));

    if (fileName) fs.rm(filePath, err => res.status(500).send(err));
    res.status(201).json({ messages: 'Email sent' });
});

module.exports = router;
