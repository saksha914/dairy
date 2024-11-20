const express = require("express");
const {
  createHealthRecord,
  getHealthRecords,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
  fetchAll,
} = require("../middleware/healthRecordMiddleware");
const auth = require("../middleware/jwtVerify");

const healthRecordrouter = express.Router();

healthRecordrouter.post("/createHealthRecord", auth, createHealthRecord);

healthRecordrouter.get(
  "/getHealthRecords/:livestockId",
  auth,
  getHealthRecords
);
healthRecordrouter.get("/fetchallrecords", auth, fetchAll);

healthRecordrouter.get("/getHealthRecord/:id", auth, getHealthRecordById);

healthRecordrouter.post("/updateHealthRecord/:id", auth, updateHealthRecord);

healthRecordrouter.post("/deleteHealthRecord/:id", auth, deleteHealthRecord);

module.exports = healthRecordrouter;
