const _ = require('lodash');
const authz = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const { Contact, validate } = require('../models/contact');
const express = require('express');
const router = express.Router();

router.get('/me', authz, async (req, res) => {
    const contact = await Contact.findById(req.contact._id)
                                 .select(['-password', '-phone', '-photoUrl']);
    res.send(contact);
})

router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
})

router.get('/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return res.status(404).send('The contact with the given ID was not found.');
    } 
    res.send(contact);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    let contact = await Contact.findOne({ name: req.body.name });
    if (contact) {
        return res.status(400).send('Contact already exist');
    }
    contact = new Contact(_.pick(req.body, ['name', 'email', 'password', 'phone', 'photoUrl']));
    
    const salt = await bcrypt.genSalt(10);
    contact.password = await bcrypt.hash(contact.password, salt);

    await contact.save();

    const token = contact.generateAuthToken();
    res.header('x-authz-token', token).send(_.pick(contact, ['_id', 'name', 'email']));
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } 
    const contact = await Contact.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!contact) {
        return res.status(404).send('The contact with the given ID was not found.');
    } 
    res.send(contact);
})


router.patch('/:id', async (req, res) => {
    /* const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }  */
    const options = {
        name: req.body.name,
        email: req.body.email
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, options, { new: true });
    if (!contact) {
        return res.status(404).send('The contact with the given ID was not found.');
    }
    await contact.save();
    res.send(contact);
})

router.delete('/:id', async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);

    if (!contact) {
        return res.status(404).send('The contact with the given ID was not found.');
    }
    res.send(contact);
})

module.exports = router;