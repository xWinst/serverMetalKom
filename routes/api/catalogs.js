const express = require('express');
const catalog = require('../../models/catalog');
const router = express.Router();

router.get('/all', async (req, res, next) => {
    try {
        const result = await catalog.getAllCategories();
        // console.log('result: ', result);
        if (!result) throw RequestError(404, 'Not found');
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:catalogId', async (req, res, next) => {
    try {
        const { catalogId } = req.params;
        const result = await catalog.getCatalog(catalogId);
        if (!result) throw RequestError(404, 'Not found');
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:catalogId/:productId', async (req, res, next) => {
    console.log('req.params: ', req.params);
    try {
        const { catalogId, productId } = req.params;
        const product = await catalog.getProduct(catalogId, productId);
        if (!product) throw RequestError(404, 'Not found');
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
