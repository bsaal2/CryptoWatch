const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

const { API_TIMEOUT } = require('./constant');

const app = express();

/** Middlewares */
app.use(timeout(API_TIMEOUT));
app.use(bodyParser.json({ limit: '2mb' }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hey' });
});

module.exports = app;