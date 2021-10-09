const express = require('express')
const fs = require('fs')
const router = express.Router()
const Product = require('../models/productModels')

router.get('/', async (req, res) => {
    const products = await Product.find({})
    res.json({
        status:201,
        message:'Success',
        data: products,
    })
})

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id})
    res.json({
        status:201,
        message:'Success',
        data: product,
    })
})
router.post('/add', async (req, res, next) => {
    const { name, categories, priceCOP, priceUSD, description, cantidad } = req.body;
    const { image } = req.files;
    if (!name || name.length === 0) {
        res.status(400).json({
            error: "Name is missing"
        })
    }
    else if (!categories || categories.length === 0) {
        res.status(400).json({
            error: "Categories is missing"
        })
    }
    else if (!priceCOP) {
        res.status(400).json({
            error: "Price is missing"
        })
    }
    else if (!image) {
        res.status(400).json({
            error: "Image is missing"
        })
    }
    else if (!description || description.length === 0) {
        res.status(400).json({
            error: "description is missing"
        })
    } else {

        try {
            const extension = image.mimetype.split('/')[1]
            const categoriesNew = categories.split(", ")
            const base64 = new Buffer(image.data).toString("base64");
            const newProduct = new Product({ name, categories: categoriesNew, imageExtension:extension, priceCOP, priceUSD, image: base64, description, cantidad });
            const productSaved = await newProduct.save();
            // await fs.unlink(req.file.path)
            res.json(productSaved)
        } catch (e) {
            next(e)
        }

    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const productUpdated = await Product.updateOne({ _id: id }, req.body);
        res.status(200).json(productUpdated)
    }
    catch (e) {
        res.status(400)
        next(e)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const productToDelete = await Product.deleteOne({_id: id})
        if (!productToDelete) {
            res.status(400)
        }
        res.json(productToDelete)
    }
    catch (e) {
        res.status(400)
        next(e)
    }
})
module.exports = router;