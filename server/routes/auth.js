const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { Contact } = require('../models/contact');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let contact = await Contact.findOne({ email: req.body.email });
    if (!contact) return res.status(400).send('Invalid email or password');

    const validpass = await bcrypt.compare(req.body.password, contact.password);
    if ( !validpass ) {
        return res.status(400).send('Invalid email or password');
    }

    const token = contact.generateAuthToken();    
    res.json(token);
})

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;