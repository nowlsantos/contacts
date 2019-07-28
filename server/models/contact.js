const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    photoURL: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
}));

function validateContact(contact) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        address: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(255).required(),
        photoURL: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(contact, schema);
}

exports.Contact = Contact;
exports.validate = validateContact;