const express = require('express');
const { createLivestock, getLivestock, getLivestockById, updateLivestock, deleteLivestock } = require('../middleware/livestockMiddleware');
const auth = require('../middleware/jwtVerify');
const livestockRouter = express.Router();

livestockRouter.post('/addLivestock', auth, createLivestock);
livestockRouter.get('/getlivestock', auth, getLivestock);
livestockRouter.get('/getLivestockById/:id', auth, getLivestockById);
livestockRouter.post('/updateLivestock/:id', auth, updateLivestock);
livestockRouter.delete('/deleteLivestock/:id', auth, deleteLivestock);

module.exports = livestockRouter;