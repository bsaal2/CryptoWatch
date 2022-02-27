const express = require('express');

const app = express.Router();

const { ROUTES } = require('./constant');
const { wishlist } = require('../validators');
const { WishlistController } = require('../controllers');

app.get(ROUTES.WISHLIST.GET_ALL, WishlistController.getAllWishlist);

app.post(ROUTES.WISHLIST.POST, wishlist.createWishlistValidator, WishlistController.addWishlist);

module.exports = app;