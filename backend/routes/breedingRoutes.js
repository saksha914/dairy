const express  = require('express')
const { createBreedingRecord, getBreedingRecords, getBreedingRecordById, updateBreedingRecord, deleteBreedingRecord } = require('../middleware/breedingRecordMiddleware')
const breedingRoutes = express.Router()

breedingRoutes.post('/createBreedingRecord' , createBreedingRecord);
breedingRoutes.get('/getBreedingRecords/:livestockId' , getBreedingRecords);
breedingRoutes.get('/getBreedingRecordById/:id' , getBreedingRecordById);
breedingRoutes.post('/updateBreedingRecord/:id' , updateBreedingRecord);
breedingRoutes.delete('/deleteBreedingRecord/:id' , deleteBreedingRecord);


module.exports = breedingRoutes;