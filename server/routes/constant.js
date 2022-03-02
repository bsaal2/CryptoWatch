const ROUTES = {
    CRYPTOS: {
        GET_ALL: '/v1.0/cryptos'
    },
    WISHLIST: {
        GET_ALL: '/v1.0/wishlists',
        POST: '/v1.0/wishlist',
        DELETE: '/v1.0/wishlist/:id'
    },
    NOTIFICATION: {
        GET_ALL: '/v1.0/notifications',
        DELETE: '/v1.0/notification/:id'
    }
};

module.exports = {
    ROUTES
};