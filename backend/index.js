const express = require('express');
require('./conn/conn.js'); 
const cors = require('cors');
const app = express();
require('dotenv').config();

// Define allowed origins
const allowedOrigins = ['https://farmosss.netlify.app/']; // Add your allowed origins here

// CORS options
const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any other custom headers you need
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Importing routes
const farmerRoutes = require("./routes/farmer.js");
const productRouter = require('./routes/productRoutes.js');
const salesRouter = require('./routes/salesRoute.js');
const livestockRouter = require('./routes/livestockRoutes.js');
const breedingRoutes = require('./routes/breedingRoutes.js');
const healthRecordRouter = require('./routes/healthRecordRoutes.js');
const expenseRouter = require('./routes/expenseRoutes.js');
const netEarningRoute = require('./routes/netEarning.js');
const aiRoute = require('./routes/aiRoute.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

// Use routes
app.use(farmerRoutes);  
app.use(productRouter);
app.use(salesRouter); 
app.use(livestockRouter);
app.use(breedingRoutes);
app.use(healthRecordRouter);
app.use(expenseRouter);
app.use(netEarningRoute);
app.use(aiRoute);
app.use(notificationRoutes);
app.use('/admin', adminRoutes);

// Pre-flight request handling
app.options('*', cors(corsOptions));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
