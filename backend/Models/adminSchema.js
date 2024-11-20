const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
