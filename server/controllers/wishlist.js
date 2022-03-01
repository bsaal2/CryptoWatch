const { crypto, wishlist } = require('../models');
const { STATUS_CODE } = require('./constant');
const { ValidationHelper } = require('../helpers');

class WishlistController {
    getAllWishlist = async (req, res, next) => {
        try {
            if (ValidationHelper.serverParameterValidationCheck(req, res)) return;

            const { page, pageSize } = req.query;
            const offset = +page * +pageSize;

            const list = await wishlist.findAll({ 
                attributes: ['id', 'min_price', 'max_price'],
                include: [
                    {   
                        attributes: ['id', 'code', 'logo', 'name', 'price', 'marketCap', 'change'],
                        model: crypto
                    }
                ],
                offset, 
                limit: +pageSize 
            });
            const total = await wishlist.count();
            
            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                message: 'Success',
                data: list,
                totalRecord: total
            });
        }

        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }

    addWishlist = async (req, res, next) => {
        try {
            if (ValidationHelper.serverParameterValidationCheck(req, res)) return;

            const { code } = req.body

            const cryptoObj = await crypto.findOne({ where: { code }});
            if (!cryptoObj) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    status: STATUS_CODE.NOT_FOUND,
                    error: true,
                    message: 'Data not found'
                });
            }

            const record = await wishlist.findOne({ where: { cryptoId: cryptoObj.id }});
            if (record) {
                return res.status(STATUS_CODE.OK).json({
                    status: STATUS_CODE.DUPLICATE,
                    error: true,
                    message: 'Already in the wishlist'
                });
            }

            req.body = { ...req.body, cryptoId: cryptoObj.id };
            await wishlist.create(req.body);

            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                error: false,
                message: 'Success on adding to wishist'
            });
        }   

        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }

    deleteWishlist = async (req, res, next) => {
        try {
            if (ValidationHelper.serverParameterValidationCheck(req, res)) return;

            const { id } = req.params

            const record = await wishlist.findOne({ where: { id }});
            if (!record) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    status: STATUS_CODE.NOT_FOUND,
                    error: true,
                    message: 'Data not found'
                });
            }

            await record.destroy({ force: true });

            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                error: false,
                message: 'Success on deleting from wishist'
            });
        }   

        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }


}

module.exports = new WishlistController();