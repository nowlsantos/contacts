const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    photoURL: String
})

const Contact = mongoose.model('Contact', contactSchema);

async function createContact() {
    const contact = new Contact({
        name: 'Nowl Santos',
        address: 'P1 B22 L23 Jakarta St. Golden City, Imus, Cavite',
        photoURL: ''
    })
    const result = await contact.save();
    console.log('Contact:', result)
}

async function getContacts() {
    return await Contact.find();
}

module.exports = Contact;
module.exports = contactSchema;