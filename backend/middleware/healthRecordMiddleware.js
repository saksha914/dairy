const HealthRecord = require('../Models/healthRecordSchema');

exports.createHealthRecord = async (req, res) => {
    try {
        const healthRecord = new HealthRecord({ ...req.body });
        const savedHealthRecord = await healthRecord.save();
        res.status(201).json({ message: "Health record created successfully", healthRecord: savedHealthRecord });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getHealthRecords = async (req, res) => {
    try {
        const healthRecords = await HealthRecord.find({ livestock: req.params.livestockId });
        res.status(200).json(healthRecords);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
exports.fetchAll = async (req, res) => {
    try {
        const healthRecords = await HealthRecord.find();
        res.status(200).json(healthRecords);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

exports.getHealthRecordById = async (req, res) => {
    try {
        const healthRecord = await HealthRecord.findById(req.params.id);
        if (!healthRecord) {
            return res.status(404).json({ message: "Health record not found" });
        }
        res.status(200).json(healthRecord);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.updateHealthRecord = async (req, res) => {
    try {
        const healthRecord = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Health record updated successfully", healthRecord });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteHealthRecord = async (req, res) => {
    try {
        await HealthRecord.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Health record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
