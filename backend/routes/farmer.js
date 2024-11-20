const express = require('express');
const router = express.Router();
const { register, login, updateFarmer, deleteFarmer, getFarmer } = require('../middleware/farmer');
const verifyToken = require('../middleware/jwtVerify');
const validate = require('../Validations/validationMiddleware');
const farmerSchema = require('../Validations/farmerValidation');

router.post('/register', validate(farmerSchema), register);
router.post('/login', login);
router.post('/updateFarmer', verifyToken, updateFarmer); 
router.post('/deleteFarmer', verifyToken,  deleteFarmer);
router.get('/getFarmer', verifyToken, getFarmer);

module.exports = router;
