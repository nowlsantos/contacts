require('dotenv').config();
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const helmet = require('helmet');
const contacts = require('./routes/contacts');
const register = require('./routes/register');
const auth = require('./routes/auth');
const path = require('path');

if ( !process.env.JWT_SECRET ) {
    console.error('FATAL ERROR: JWT_SECRET KEY is not defined');
    process.exit(1);
}

mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log('Could not connect to mongodb', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(helmet());

app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
app.use('/api/contacts', contacts);
app.use('/api/register', register)
app.use('/api/authentication', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})
