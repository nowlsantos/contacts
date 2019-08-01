require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
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
    isAdmin: Boolean
});

contactSchema.methods.generateAuthToken = function() {
    const payload = { 
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const Contact = mongoose.model('Contact', contactSchema);

function validateContact(contact) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(255).required(),
        photoURL: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(contact, schema);
}

exports.Contact = Contact;
exports.validate = validateContact;