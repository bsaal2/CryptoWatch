const ROUTES = {
    CRYPTOS: {
        GET_ALL: '/v1.0/cryptos'
    },
    WISHLIST: {
        GET_ALL: '/v1.0/wishlists',
        POST: '/v1.0/wishlist',
        DELETE: '/v1.0/wishlist/:id'
    }
};

module.exports = {
    ROUTES
};