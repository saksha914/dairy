const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    livestock: { type: mongoose.Schema.Types.ObjectId, ref: 'Livestock', required: true },
    checkupDate: { type: Date, required: true },
    details: { type: String, required: true },
    veterinarian: { type: String, required: true },
    nextCheckupDate: { type: Date, required: true}
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
