const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
