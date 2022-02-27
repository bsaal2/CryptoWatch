const express = require('express');

const app = express.Router();

const { ROUTES } = require('./constant');
const { WishlistController } = require('../controllers');

app.get(ROUTES.WISHLIST.GET_ALL, WishlistController.getAllWishlist);

module.exports = app;