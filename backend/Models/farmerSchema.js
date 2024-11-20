    const mongoose = require('mongoose');

    const farmerSchema = new mongoose.Schema({
        farmerName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["farmer"],
            default: "farmer",
        },
    });

    module.exports = mongoose.model('Farmer', farmerSchema);
