const express = require('express')
const router = express.Router()
const Category = require('../models/categoryModels')
const fs = require('fs')

router.get('/', async (req, res) => {
    const categorys = await Category.find({})
    res.json({
        status:200,
        message:'Success',
        data: categorys,
    })
})

router.post('/add', async (req, res, next) => {
    const { name } = req.body;
    const { image } = req.files;

    if (!name || name.length === 0) {
        res.status(400).json({
            error: 'No se puede mandar un nombre vacio'
        })
    }
    else if (!image) {
        res.status(400).json({
            error: 'Image is missing'
        })
    } else {
        try {
            const extension = image.mimetype.split('/')[1]
            const base64 = new Buffer(image.data).toString("base64");
            const newCategory = new Category({ name, image: base64, imageExtension:extension, })
            const saveCategory = await newCategory.save()
            res.status(201).json(saveCategory)
        } catch (e) {
            res.status(404)
            next(e)
        }
    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(req.body)
        const categoryUpdated = await Category.updateOne({ _id: id }, req.body)
        res.json(categoryUpdated)
    } catch (e) {
        res.status(400)
        next(e)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const categoryDeleted = await Category.deleteOne({ _id: id })
        res.json(categoryDeleted)
    } catch (e) {
        res.status(400)
        next(e)
    }
})

module.exports = router