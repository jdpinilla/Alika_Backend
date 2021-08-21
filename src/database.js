const mongoose = require('mongoose');

const { DB_ACCESS, DB_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test'
    ? DB_TEST
    : DB_ACCESS

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(db => console.log('Db is connected'))
    .catch(err => console.error(err));
