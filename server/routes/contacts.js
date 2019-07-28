const { Contact, validate } = require('../models/contact');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
})

router.get('/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    res.send(contact);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let contact = await Contact.findOne({ name: req.body.name });
    if (!contact) return res.status(400).send('Contact already exist');

    contact = new Contact({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        photoURL: req.body.photoURL
    })
    await contact.save();
    res.send(contact);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const contact = await Contact.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    res.send(contact);
})

router.delete('/:id', async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    res.send(contact);
})

module.exports = router;