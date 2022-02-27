const { STATUS_CODE, ERROR_TYPE } = require('../controllers/constant');

class MiddlewareService {
    unregisteredRoute = (req, res, next) => {
        const error = new Error('Not Found');
        error.status = STATUS_CODE.ROUTE_NOT_FOUND
        error.type = ERROR_TYPE.ROUTE_NOT_FOUND;
        error.message = 'Requested route not found';
        next(error);
    }

    errorHandling = (error, req, res, next) => {
        return res.status(error.status).json({
            status: error.status,
            error: true,
            message: error.message
        });
    }
}

module.exports = new MiddlewareService();
