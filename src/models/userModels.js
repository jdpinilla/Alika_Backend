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
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user'
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