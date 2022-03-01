const { checkSchema } = require('express-validator/check');

const getAllWishlistValidator = checkSchema(
    {
        page: {
            in: ['query'],
            exists: true,
            isInt: true,
            toInt: true,
            trim: true
        },
        pageSize: {
            in: ['query'],
            exists: true,
            isInt: true,
            toInt: true,
            trim: true
        }
    }
);

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

const deleteWishlistValidator = checkSchema(
    {
        id: {
            in: ['params'],
            exists: true,
            isInt: true,
            toInt: true
        }
    }
);

module.exports = {
    getAllWishlistValidator,
    createWishlistValidator,
    deleteWishlistValidator
};
