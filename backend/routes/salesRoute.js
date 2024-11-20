const express = require('express');
const { createSale, getSales, getSaleById } = require('../middleware/salesMiddleware');
const auth = require('../middleware/jwtVerify');
const salesRouter = express.Router();

salesRouter.post('/createSales', auth, createSale);
salesRouter.get('/getSales', auth, getSales);
salesRouter.get('/getsale/:id', auth, getSaleById);

module.exports = salesRouter;
