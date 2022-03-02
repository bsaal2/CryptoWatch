const { checkSchema } = require('express-validator/check');

const getAllNotificationValidator = checkSchema(
    {
        page: {
            in: ['query'],
            exists: true,
            isInt: true,
            toInt: true,
            trim: true
        },
        pageSize: {
            in: ['query'],
            exists: true,
            isInt: true,
            toInt: true,
            trim: true
        }
    }
);

const deleteNotificationValidator = checkSchema(
    {
        id: {
            in: ['params'],
            exists: true,
            isInt: true,
            toInt: true
        }
    }
);

module.exports = {
    getAllNotificationValidator,
    deleteNotificationValidator
};
