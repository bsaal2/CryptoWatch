const express = require('express');

const app = express.Router();

const { ROUTES } = require('./constant');
const { CryptoController } = require('../controllers');

app.get(ROUTES.CRYPTOS.GET_ALL, CryptoController.getAllCrypto);

module.exports = app;