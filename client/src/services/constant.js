const API_URL = 'http://localhost:3500';

const RESOURCE = {
    CRYPTO: {
        GET_ALL: '/v1.0/cryptos'
    },
    WISHLIST: {
        GET_ALL: '/v1.0/wishlists',
        POST: '/v1.0/wishlist',
        DELETE: '/v1.0/wishlist/'
    },
    NOTIFICATION: {
        GET_COUNT: '/v1.0/notifications/count',
        GET_ALL: '/v1.0/notifications',
        DELETE: '/v1.0/notification'
    }
};

const METHOD = {
    GET: 'get',
    POST: 'post',
}

export {
    API_URL,
    RESOURCE,
    METHOD
};
