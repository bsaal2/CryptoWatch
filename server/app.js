const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

const crypto = require('./routes/crypto');

const { MiddlewareService } = require('./services');
const { API_TIMEOUT } = require('./constant');

const app = express();

/** Middlewares */
app.use(timeout(API_TIMEOUT));
app.use(bodyParser.json({ limit: '2mb' }));

app.use(crypto);

/** Middleware: Route Not Found */
app.get('*', MiddlewareService.unregisteredRoute);

/** Middleware: To handle the application errors  */
app.use(MiddlewareService.errorHandling);

module.exports = app;