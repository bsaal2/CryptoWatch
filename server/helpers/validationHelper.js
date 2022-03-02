const { validationResult } = require('express-validator/check');

class ValidationHelper {

    /**
     * Function to validate all the parameters of the API
     * Express Validator
     * @param {*} req
     * @param {*} res
     * @return {*} 
     * @memberof ValidationHelper
     */
    serverParameterValidationCheck(req, res) {
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            const responseObj = {
                status: 400,
                message: 'Bad Request',
                errors: validationError.array()
            };

            return res.status(responseObj.status).json(responseObj);

            return true;
        }

        return false;
    }
}

module.exports = new ValidationHelper();