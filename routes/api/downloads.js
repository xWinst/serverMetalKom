const express = require('express');
const getPath = require('../../downloads');

const router = express.Router();

router.get('/:fileName', (req, res, next) => {
    const { fileName } = req.params;
    const filePath = getPath(fileName);
    // console.log('result: ', result);
    // res.status(200).json(result);
    // res.status(200).send(result);
    res.status(200).download(filePath, fileName);
    // const filePath = path.join(__dirname, `/upload/${fileName}`);
});

module.exports = router;
