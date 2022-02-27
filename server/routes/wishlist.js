const express = require('express');

const app = express.Router();

const { ROUTES } = require('./constant');
const { WishlistController } = require('../controllers');

app.get(ROUTES.WISHLIST.GET_ALL, WishlistController.getAllWishlist);

app.post(ROUTES.WISHLIST.POST, WishlistController.addWishlist);

module.exports = app;