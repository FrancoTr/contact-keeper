const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
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

        const salt = await bcrypt.genSalt(10)   //.getSalt(x) ; x determines how secure the salt will be

        user.password = await bcrypt.hash(password, salt) //with the plain text password and the salt, we create a hashed password

        await user.save()

        const paylod = {    //sent object inside the token
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000    //tweak to 360 (1 hour) when finished testing
        }, (err, token) => {
            if(err) {
                throw err
            } 
            res.json({ token })
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router