const mongoose = require('mongoose')
const ordersTemplate = mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    finalPrice: {
        type: Number,
        required: true
    }
})

module.exports = new mongoose.model('Order', ordersTemplate)