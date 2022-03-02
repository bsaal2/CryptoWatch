const { crypto, notification } = require('../models');
const { STATUS_CODE } = require('./constant');
const { ValidationHelper } = require('../helpers');

class NotificationController {

    /**
     * Get total notification
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof NotificationController
     */
    getNotificationCount = async (req, res, next) => {
        try {

            const total = await notification.count();

            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                message: 'Success',
                error: false,
                totalRecord: total
            });
        }
        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }

    /**
     * Function to get all the notification
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof NotificationController
     */
    getAllNotification = async (req, res, next) => {
        try {
            if (ValidationHelper.serverParameterValidationCheck(req, res)) return;

            const { page, pageSize } = req.query;
            const offset = +page * +pageSize;

            const list = await notification.findAll({ 
                attributes: ['id', 'title', 'description', 'status'],
                offset, 
                limit: +pageSize,
                order: [['updatedAt', 'DESC']]
            });
            const total = await notification.count();
            
            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                message: 'Success',
                error: false,
                data: list,
                totalRecord: total
            });
        }

        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }

    /**
     * Function to remove the notification
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof NotificationController
     */
    deleteNotification = async (req, res, next) => {
        try {
            if (ValidationHelper.serverParameterValidationCheck(req, res)) return;

            const { id } = req.params

            const record = await wishlist.findOne({ where: { id }});
            if (!record) {
                return res.status(STATUS_CODE.NOT_FOUND).json({
                    status: STATUS_CODE.NOT_FOUND,
                    error: true,
                    message: 'Data not found'
                });
            }

            await record.destroy({ force: true });

            return res.status(STATUS_CODE.OK).json({
                status: STATUS_CODE.OK,
                error: false,
                message: 'Success on deleting from wishist'
            });
        }   

        catch (error) {
            error.status = STATUS_CODE.SERVER_ERROR;
            next(error);
        }
    }


}

module.exports = new NotificationController();