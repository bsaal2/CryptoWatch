const express = require('express');

const app = express.Router();

const { ROUTES } = require('./constant');
const { wishlist } = require('../validators');
const { WishlistController } = require('../controllers');

app.get(ROUTES.WISHLIST.GET_ALL, wishlist.getAllWishlistValidator, WishlistController.getAllWishlist);

app.post(ROUTES.WISHLIST.POST, wishlist.createWishlistValidator, WishlistController.addWishlist);

app.delete(ROUTES.WISHLIST.DELETE, wishlist.deleteWishlistValidator, WishlistController.deleteWishlist);

module.exports = app;