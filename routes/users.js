const express = require('express');
const userSchema = require('../models/person')

const router = express.Router();


// get data

router.post('/persons', (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})

router.get('/persons', (req, res) => {
    userSchema.find().then((data) => res.json(data))
    console.log('found')
})

module.exports = router;