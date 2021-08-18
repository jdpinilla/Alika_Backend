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

router.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

router.post('/add', async (req, res) => {
    const { name, categories, priceCOP, priceUSD, image, description, cantidad } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path)
    image = result.url
    const newProduct = new Product({ name, categories, priceCOP, priceUSD, image, description, cantidad });
    await newProduct.save();
    await fs.unlink(req.file.path)
    res.send('Creado satisfactoriamente')
})

router.post('/edit', async (req, res) => {
    const { id } = req.params;
    await Product.update({ _id: id }, req.body)

    res.send('Actualizado correctamente')
})

router.get('/delete', async (req, res) => {
    const { id } = req.params;
    await Product.remove({ _id: id })

    res.send('Eliminado correctamente')
})
module.exports = router;