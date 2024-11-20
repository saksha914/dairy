const Livestock = require('../Models/livestockSchema');

exports.createLivestock = async (req, res) => {
    try {
        const livestock = new Livestock({ ...req.body, farmer: req.user._id });
        const savedLivestock = await livestock.save();
        res.status(201).json({ message: "Livestock created successfully", livestock: savedLivestock });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.find({ farmer: req.user._id });
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getLivestockById = async (req, res) => {
    try {
        const livestock = await Livestock.findById(req.params.id);
        if (!livestock || livestock.farmer.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Livestock not found" });
        }
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.updateLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Livestock updated successfully", livestock });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteLivestock = async (req, res) => {
    try {
        await Livestock.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Livestock deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
