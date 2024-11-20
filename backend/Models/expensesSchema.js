const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount cannot be negative']
    },
    expenseDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
