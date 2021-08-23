const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserTemplate = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user'
    },

})

UserTemplate.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.password
    }
})

UserTemplate.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserTemplate.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', UserTemplate)