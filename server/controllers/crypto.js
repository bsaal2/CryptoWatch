const { crypto, wishlist } = require('../models');
const { STATUS_CODE } = require('./constant');
const { ValidationHelper } = require('../helpers');

class CryptoController {

    /**
     * Function to list all the crypto
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof CryptoController
     */
    getAllCrypto = async (req, res, next) => {
        try {
            if (ValidationHelper.serverParameterValidationCheck(req, res)) return;

            const { page, pageSize } = req.query;
            const offset = +page * +pageSize;

            const cryptoList = await crypto.findAll({ 
                include: [
                    {
                        attributes: ['id'],
                        model: wishlist
                    }
                ],
                offset,
                limit: +pageSize 
            });
            const total = await crypto.count();
            
            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                message: 'Success',
                data: cryptoList,
                totalRecord: total
            });
        }

        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }
}

module.exports = new CryptoController();