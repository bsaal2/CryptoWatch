const express = require('express');

const app = express.Router();

const { crypto } = require('../validators');
const { ROUTES } = require('./constant');
const { CryptoController } = require('../controllers');

app.get(ROUTES.CRYPTOS.GET_ALL, crypto.getAllCryptoValidator, CryptoController.getAllCrypto);

module.exports = app;