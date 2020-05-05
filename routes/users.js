const express = require('express')
const router = express.Router()
const users = require('../db/schema')
console.log("users t")
router.post('/', async(req, res) => {
    console.log("sdf")
    const user = new user({
        name: 'Eldhos',
        email: 'eldhosaji1998@gmail.com',
        password: 'Adcasp879sfSaca'
    })
    try {
        const newuser = await users.save()
        console.log(newuser)
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router