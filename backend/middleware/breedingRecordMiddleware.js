const BreedingRecord = require('../Models/breedingRecordSchema');

exports.createBreedingRecord = async (req, res) => {
    try {
        const breedingRecord = new BreedingRecord({ ...req.body });
        const savedBreedingRecord = await breedingRecord.save();
        res.status(201).json({ message: "Breeding record created successfully", breedingRecord: savedBreedingRecord });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getBreedingRecords = async (req, res) => {
    try {
        const breedingRecords = await BreedingRecord.find({ livestock: req.params.livestockId });
        res.status(200).json(breedingRecords);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getBreedingRecordById = async (req, res) => {
    try {
        const breedingRecord = await BreedingRecord.findById(req.params.id);
        if (!breedingRecord) {
            return res.status(404).json({ message: "Breeding record not found" });
        }
        res.status(200).json(breedingRecord);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.updateBreedingRecord = async (req, res) => {
    try {
        const breedingRecord = await BreedingRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Breeding record updated successfully", breedingRecord });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteBreedingRecord = async (req, res) => {
    try {
        await BreedingRecord.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Breeding record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
