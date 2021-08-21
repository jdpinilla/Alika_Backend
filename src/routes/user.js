const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../models/userModels')


router.get('/', async (req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)
})
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) throw 'No hay usuario'
        else {
            req.login(user, { session: false }, async (err) => {
                if (err) throw err;
                const body = { id: user._id, email: user.email, fullName: user.fullName, role: user.role }
                const token = jwt.sign({ user: body }, 'top_secret')
                res.send(token)
            });
        };
    })(req, res, next);
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password, confirm_password } = req.body;
    const errors = []
    if (fullName.length <= 0) {
        errors.push({ text: 'Please insert your name' });
    }
    if (password.length <= 4) {
        errors.push({ text: 'Password must be at least 4 characters' })
    }
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' })
    }
    if (errors.length > 0) {
        res.status(400).render('users/signup', { errors, fullName, email, password, confirm_password })
    } else {
        const emailUser = await User.findOne({ email: email })
        if (emailUser) {
            res.send('error')
        } else {
            const newUser = new User({ fullName, email, password });
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            res.send('Creado satisfactoriamene')
        }
    }
})
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.send(req.user)
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;
