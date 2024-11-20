const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../middleware/Admin/adminMiddlware");
const { fetchFarmers, createFarmer, updateFarmer, deleteFarmer } = require("../middleware/Admin/farmerAdminMiddleware");
const { fetchProducts, addProduct, delProduct, editProduct } = require("../middleware/Admin/productAdminMiddleware");
const { fetchLivestocks, addLivestock, delLivestock, updateLivestock } = require("../middleware/Admin/adminLivestockMiddlware");
const adminRoutes = express.Router();

// Admin routes
adminRoutes.post("/registeradmin", registerAdmin);
adminRoutes.post("/loginadmin", loginAdmin);
adminRoutes.put("/update", updateAdmin);
adminRoutes.delete("/delete", deleteAdmin);

// Admin powers over farmers
adminRoutes.post('/addfarmers', createFarmer);
adminRoutes.put('/updatefarmer/:id',updateFarmer);
adminRoutes.delete('/deletefarmer/:id', deleteFarmer);
adminRoutes.get("/fetchfarmers", fetchFarmers);

// Admin power over farmer's product
adminRoutes.get('/fetchproduct/:id', fetchProducts);
adminRoutes.post('/addproduct/:farmerId' , addProduct);
adminRoutes.post('/deleteproduct/:id' , delProduct);
adminRoutes.post('/editproduct/:id' , editProduct);

//Admin power over farmer's Livestock
adminRoutes.get('/fetchlivestock/:id', fetchLivestocks);
adminRoutes.post('/addlivestock/:farmerId', addLivestock);
adminRoutes.post('/deletels/:id', delLivestock);
adminRoutes.post('/updatelivestock/:id', updateLivestock);



module.exports = adminRoutes;
