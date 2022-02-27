const { crypto } = require('../models');
const { STATUS_CODE } = require('./constant');

class CryptoController {
    getAllCrypto = async (req, res, next) => {
        try {
            const cryptoList = await crypto.findAll();
            
            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                message: 'Success',
                data: cryptoList
            });
        }

        catch (error) {
            next(error);
        }
    }
}

module.exports = new CryptoController();