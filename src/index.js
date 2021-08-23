const express = require('express')
const dotenv = require('dotenv')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

//Initializations
const app = express()
dotenv.config()

require('./database')
require('./config/passport')
//Settings
app.set('port', process.env.PORT)

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}
))
app.use(session({
    cookie: {
        secure: true,
        maxAge: 60000
    },
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true,
}))
app.use(cookieParser("mySecretApp"))
app.use(passport.initialize());
app.use(passport.session());

//Global Variables


//Routes
app.use('/user', require('./routes/user'))
app.use('/product', require('./routes/product'))
app.use('/checkout', require('./routes/checkout'))
app.use('/category', require('./routes/category'))
const server = app.listen(app.get('port'), () =>
    console.log('Server run on port', app.get('port'))

);

module.exports = { app, server }