const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'Total price cannot be negative']
    },
    saleDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    customer: {
        type: String
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true,
        index: true
    }
});

module.exports = mongoose.model('Sale', saleSchema);
    