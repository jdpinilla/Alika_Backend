const mongoose = require('mongoose')

const productsTemplate = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    priceCOP: {
        type: Number,
        required: true
    },
    priceUSD: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        data: Buffer,
    },
    description: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
})

module.exports = new mongoose.model('Product', productsTemplate)