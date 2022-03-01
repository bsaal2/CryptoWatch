const { crypto } = require('../models');
const { STATUS_CODE } = require('./constant');

class CryptoController {
    getAllCrypto = async (req, res, next) => {
        try {
            const { page, pageSize } = req.query;
            const offset = +page * +pageSize;

            const cryptoList = await crypto.findAll({ offset, limit: +pageSize });
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