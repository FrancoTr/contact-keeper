const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        
        if(user) {
            return res.status(400).json({ msg: 'User already exists'})
        }

        user = new User({   //It creates a new instance of a user, still not present on the DB
            name,
            email,
            password
        })
        
    } catch (err) {

    }
})

module.exports = router