const express = require("express")
const aiRoute = express.Router();
const { suggest } = require("../middleware/aiMiddleware");

aiRoute.post('/farming-tips',suggest)

module.exports = aiRoute;