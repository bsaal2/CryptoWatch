const { wishlist } = require('../models');
const { STATUS_CODE } = require('./constant');

class WishlistController {
    getAllWishlist = async (req, res, next) => {
        try {
            const list = await wishlist.findAll();
            
            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                message: 'Success',
                data: list
            });
        }

        catch (error) {
            next(error);
        }
    }
}

module.exports = new WishlistController();