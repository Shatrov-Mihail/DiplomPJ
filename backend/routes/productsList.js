const express = require('express');
const router = express.Router();
const { getProduct, getProductsList, addProduct, editProduct, deleteProduct } = require('../controllers/product');
const mapProduct = require('../helpers/mapProduct');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

router.get('/', async (req, res) => {
    const { search, limit, page, sortOrder } = req.query;
    const sort = sortOrder === 'desc' ? -1 : 1;

    const { productsList, lastPage } = await getProductsList(search, limit, page, sort);
    res.send({ data: { lastPage, productsList: productsList.map(mapProduct) } })
});

router.get('/:id', async (req, res) => {
    const product = await getProduct(req.params.id)
    res.send({ data: mapProduct(product) })
});

router.use(authenticated);

router.post('/', hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const newProduct = await addProduct({
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            additionalImages: req.body.additionalImages,
            category: req.body.category,
            price: req.body.price
        });
        res.send({ data: mapProduct(newProduct) });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch('/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        additionalImages: req.body.additionalImages,
        category: req.body.category,
        price: req.body.price
    });
    res.send({ data: mapProduct(updatedProduct) })
});

router.delete('/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteProduct(req.params.id);
    res.send({ error: null })
});

module.exports = router; 