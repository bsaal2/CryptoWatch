const { STATUS_CODE } = require('./constant');

class CryptoController {
    getAllCrypto = (req, res, next) => {
        try {
            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                message: 'Success'
            });
        }

        catch (error) {
            next(error);
        }
    }
}

module.exports = new CryptoController();