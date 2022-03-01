const { STATUS_CODE, ERROR_TYPE } = require('../controllers/constant');

class MiddlewareService {
    
    /**
     * Function to handle the unregistered route in the application
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof MiddlewareService
     */
    unregisteredRoute = (req, res, next) => {
        const error = new Error('Not Found');
        error.status = STATUS_CODE.ROUTE_NOT_FOUND
        error.type = ERROR_TYPE.ROUTE_NOT_FOUND;
        error.message = 'Requested route not found';
        next(error);
    }

    /**
     * All the errors related to the application is handled here
     * Error Handling middleware
     * @param {*} error
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof MiddlewareService
     */
    errorHandling = (error, req, res, next) => {
        return res.status(error.status).json({
            status: error.status || STATUS_CODE.SERVER_ERROR,
            error: true,
            message: error.message
        });
    }
}

module.exports = new MiddlewareService();
