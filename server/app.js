const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

const crypto = require('./routes/crypto');

const { API_TIMEOUT } = require('./constant');

const app = express();

/** Middlewares */
app.use(timeout(API_TIMEOUT));
app.use(bodyParser.json({ limit: '2mb' }));

app.use(crypto);

module.exports = app;