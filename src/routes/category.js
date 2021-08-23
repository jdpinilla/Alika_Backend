const express = require('express')
const router = express.Router()
const Category = require('../models/categoryModels')

router.get('/', async (req, res) => {
    const categorys = await Category.find()
    res.json(categorys)
})

router.post('/add', async (req, res, next) => {
    const { name, image } = req.body

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
            const newCategory = new Category({ name, image })
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
        const categoryUpdated = await Category.findByIdAndUpdate({ id: id })
        res.json(categoryUpdated)
    } catch (e) {
        res.status(400)
        next(e)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const categoryDeleted = await Category.findByIdAndRemove(id)
        res.json(categoryDeleted)
    } catch (e) {
        res.status(400)
        next(e)
    }
})

module.exports = router