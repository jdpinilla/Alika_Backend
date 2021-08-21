const mongoose = require('mongoose')

const categorysSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,

    }
})
module.exports = new mongoose.model('Category', categorysSchema)
