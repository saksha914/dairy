const express = require('express');
const notificationRoutes = express.Router();
const Notification = require('../Models/notificationModel');
const verifyToken = require('../middleware/jwtVerify');
const { getNotifications, deleteNotification } = require('../middleware/notificationMiddleware');

notificationRoutes.get('/notifications',verifyToken, getNotifications);
notificationRoutes.delete('/notifications/:id',verifyToken, deleteNotification);

module.exports = notificationRoutes;
