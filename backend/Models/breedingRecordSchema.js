const mongoose = require("mongoose");

const breedingRecordSchema = new mongoose.Schema({
  livestock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livestock",
    required: true,
  },
  breedingDate: { type: Date, required: true },
  details: { type: String, required: true },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livestock",
    required: true,
  },
});

module.exports = mongoose.model("BreedingRecord", breedingRecordSchema);
