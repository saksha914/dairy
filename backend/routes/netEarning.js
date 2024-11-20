const express = require('express')
const netEarningRoute = express.Router()

const { netEarning } = require('../middleware/netEarning')
const auth = require('../middleware/jwtVerify')


netEarningRoute.get('/netEarnings',auth, netEarning)

module.exports = netEarningRoute;