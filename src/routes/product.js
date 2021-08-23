const express = require('express')
const cloudinary = require('cloudinary')
const fs = require('fs-extra')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const router = express.Router()

const Product = require('../models/productModels')
const { truncateSync } = require('fs-extra')

router.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

router.post('/add', async (req, res, next) => {
    const { name, categories, priceCOP, priceUSD, image, description, cantidad } = req.body;

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
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            image = result.url
            const newProduct = new Product({ name, categories, priceCOP, priceUSD, image, description, cantidad });
            const productSaved = await newProduct.save();
            await fs.unlink(req.file.path)
            res.json(productSaved)
        } catch (e) {
            next(e)
        }

    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const productUpdated = await Product.findByIdAndUpdate({ id }, req.body)

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
        const productToDelete = await Product.findByIdAndRemove(id)
        if (!productToDelete) {
            res.status(400)
        } else {
            res.status(204).json(productToDelete)
        }
    }
    catch (e) {
        res.status(400)
        next(e)
    }
})
module.exports = router;