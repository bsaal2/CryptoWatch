const { checkSchema } = require('express-validator/check');

const createWishlistValidator = checkSchema(
    {
        code: {
            in: ['body'],
            exists: true,
            isString: true,
            toString: true,
            trim: true
        },
        min_price: {
            in: ['body'],
            exists: true,
            isFloat: true,
            toFloat: true
        },
        max_price: {
            in: ['body'],
            exists: true,
            isFloat: true,
            toFloat: true,
        }
    }
);

module.exports = {
    createWishlistValidator
};
