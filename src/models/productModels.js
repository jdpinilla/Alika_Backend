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
    },
    imageExtension: {
        type: String,
        required: true,
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
productsTemplate.set('toJSON', {
    transform: (docuemnt, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = new mongoose.model('Product', productsTemplate)