// Basic Lib Import
const express = require('express');
const router = require('./src/routes/api');

const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Lib Import
const mongoose = require('mongoose');
const path = require('path');

app.use(express.static('client/build'));
// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Mongo DB Database Connection
const URI =
    'mongodb+srv://sunny21:.sunny21@cluster0.8owwoe7.mongodb.net/Inventory?retryWrites=true&w=majority';

const OPTION = { user: 'sunny21', pass: '.sunny21', autoIndex: true };
mongoose.connect(URI, OPTION, (error) => {
    console.log('Connection Success');
    console.log(error);
});

// Routing Implement
app.use('/api/v1', router);

// Undefined Route Implement
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
