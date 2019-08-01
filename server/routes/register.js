const _ = require('lodash');
const bcrypt = require('bcrypt');
const { Contact, validate } = require('../models/contact');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let contact = await Contact.findOne({ name: req.body.name });
    if (contact) {
        return res.status(400).send('Contact already registered');
    }
    contact = new Contact(_.pick(req.body, ['name', 'email', 'password', 'phone', 'photoUrl']));
    
    const salt = await bcrypt.genSalt(10);
    contact.password = await bcrypt.hash(contact.password, salt);

    await contact.save();

    const token = contact.generateAuthToken();
    res.json(token);
})

module.exports = router;