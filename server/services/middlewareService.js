const { ERROR_TYPE } = require('../controllers/constant');

class MiddlewareService {
    unregisteredRoute = (req, res, next) {
        const error = new Error('Not Found');
        error.type = ERROR_TYPE.ROUTE_NOT_FOUND;
        error.message = 'Requested not found';
        next(error);
    }
}

module.exports = new MiddlewareService();
