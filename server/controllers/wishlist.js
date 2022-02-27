const { wishlist } = require('../models');
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

            await wishlist.create(req.body);

            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                error: false,
                message: 'Success'
            })
        }   

        catch (error) {
            next(error);
        }
    }
}

module.exports = new WishlistController();