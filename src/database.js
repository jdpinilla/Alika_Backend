const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.error(err));