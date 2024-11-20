const Livestock = require('../../Models/livestockSchema');

exports.fetchLivestocks = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Invalid Farmer ID" });
      const livestocks = await Livestock.find({ farmer: id });
      return res.status(200).json(livestocks);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  };

  exports.addLivestock = async (req, res) => {
    const {farmerId} = req.params;
  try {
           const newLivestock = {
            ...req.body,
            farmer : farmerId 
        };
        const savedLivestock = await Livestock.create(newLivestock);
    return res.status(201).json(savedLivestock);
  } catch (error) {
    return res.status(500).json({ message: "Server Error",error: error.message });
  }
};

exports.delLivestock = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedLS = await Livestock.findByIdAndDelete(id);
      if (!deletedLS) return res.status(404).json({ message: "Livestock not found" });
      return res.status(200).json({ message: "Livestock deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  };

  exports.updateLivestock = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedLivestock = await Livestock.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedLivestock) return res.status(404).json({ message: "Livestock not found" });
      return res.status(200).json(updatedLivestock);
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  };