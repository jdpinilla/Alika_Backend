const mongoose = require('mongoose')

const ordersTemplate = mongoose.Schema({

    products: {
        type: Array,
        required: true
    }
})

module.exports = new mongoose.model('Order', ordersTemplate)