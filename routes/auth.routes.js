const {Router} = require('express')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const router = Router()


router.post('/register',
    [
      check('email', 'Incorrect email').isEmail(),
      check('password', 'Minimum password length is 6 symbols')
          .isLength({min: 6})
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data'
          })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
          return res.status(400).json({message: 'User already exist'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: 'User was successfully created' })

      } catch (err) {
        res.status(500).json({message: 'Something went wrong...'})
      }
    })

router.post(
    '/login',
    [
      check('email', 'Email is incorrect').normalizeEmail().isEmail(),
      check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect credentials data'
          })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user) {
          return res.status(400).json({ message: 'User is not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return res.status(400).json({ message: 'Incorrect password' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '24h' }
        )

        res.json({ token, userId: user.id })

      } catch (e) {
        res.status(500).json({ message: 'Something went wrong...' })
      }
    })

module.exports = router
