const { crypto, wishlist } = require('../models');
const { STATUS_CODE } = require('./constant');
const { ValidationHelper } = require('../helpers');

class WishlistController {
    getAllWishlist = async (req, res, next) => {
        try {
            const list = await wishlist.findAll();
            
            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                error: false,
                message: 'Success',
                data: list
            });
        }

        catch (error) {
            next(error);
        }
    }

    addWishlist = async (req, res, next) => {
        try {
            if (ValidationHelper.serverParameterValidationCheck(req, res)) return;

            const { code, min_price, max_price } = req.body

            const cryptoObj = await crypto.findOne({ where: { code }});
            if (!cryptoObj) {
                return res.status(STATUS_CODE.OK).json({
                    status: STATUS_CODE.NOT_FOUND,
                    error: true,
                    message: 'Data not found'
                });
            }

            const record = await wishlist.findOne({ where: { cryptoId: cryptoObj.id }});
            if (record) {
                return res.status(STATUS_CODE.OK).json({
                    status: STATUS_CODE.OK,
                    error: false,
                    message: 'Already in the wishlist'
                });
            }

            req.body = { ...req.body, cryptoId: cryptoObj.id };
            await wishlist.create(req.body);

            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                error: false,
                message: 'Success'
            });
        }   

        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }
}

module.exports = new WishlistController();