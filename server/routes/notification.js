const express = require('express');

const app = express.Router();

const { ROUTES } = require('./constant');
const { notification } = require('../validators');
const { NotificationController } = require('../controllers');

app.get(ROUTES.NOTIFICATION.GET_ALL, notification.getAllNotificationValidator, NotificationController.getAllNotification);

app.delete(ROUTES.NOTIFICATION.DELETE, notification.deleteNotificationValidator, NotificationController.deleteNotification);

module.exports = app;