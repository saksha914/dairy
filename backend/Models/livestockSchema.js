const mongoose = require("mongoose");

const livestockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Cow, Sheep, etc.
  breed: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },
});

module.exports = mongoose.model("Livestock", livestockSchema);
