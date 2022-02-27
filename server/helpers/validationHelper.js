const { validationResult } = require('express-validator/check');

class ValidationHelper {
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