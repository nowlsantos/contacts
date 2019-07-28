require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const homeRoute = require('./routes/home');
const contactRoutes = require('./routes/contacts');

mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('Connected to mongodb');
    })
    .catch((err) => console.log('Could not connect to mongodb', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
app.use('/api/contacts', contactRoutes);
app.use('/', homeRoute);

app.use('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})
