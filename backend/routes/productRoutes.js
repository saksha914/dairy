const express = require('express');
const porductRouter  = express.Router();
const authenticateToken = require('../middleware/jwtVerify');
const { createProduct, getProducts, getProductById, deleteProduct, updateProduct, fetchAll } = require('../middleware/productMiddleware');


porductRouter.post('/createProduct', authenticateToken, createProduct);
porductRouter.get('/getProducts',authenticateToken, getProducts); 
porductRouter.get('/getProduct/:id',authenticateToken, getProductById); 
porductRouter.post('/updateProduct/:id', authenticateToken, updateProduct);
porductRouter.delete('/deleteProduct/:id', authenticateToken, deleteProduct);
porductRouter.get('/fetchproducts' , fetchAll);

module.exports = porductRouter;

