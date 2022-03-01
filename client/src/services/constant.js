const API_URL = 'http://localhost:3500';

const RESOURCE = {
    CRYPTO: {
        GET_ALL: '/v1.0/cryptos'
    },
    WISHLIST: {
        GET_ALL: '/v1.0/wishlists',
        POST: '/v1.0/wishlist',
        DELETE: '/v1.0/wishlist/'
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
