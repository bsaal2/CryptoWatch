const { checkSchema } = require('express-validator/check');

const getAllCryptoValidator = checkSchema(
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

module.exports = {
    getAllCryptoValidator
};
