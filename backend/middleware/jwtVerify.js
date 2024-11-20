const jwt = require('jsonwebtoken');
const Farmer = require('../Models/farmerSchema');


const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
        // console.log(token);

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // console.log(process.env.AUTH_SECRET_KEY);
         const decoded = jwt.verify(token, `${process.env.AUTH_SECRET_KEY}`);
        // console.log("Decoded Token:", decoded);

        req.user = await Farmer.findById(decoded.farmer._id);
        // console.log("User Found:", req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid", message: error.message });
    }
}


module.exports = verifyToken;
