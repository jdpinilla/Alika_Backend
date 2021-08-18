const express = require('express')
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body;
    const newUser = new User({
        fullname,
        email,
        password
    })
    await newUser.save()
})

module.exports = router;