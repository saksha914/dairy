const Admin = require('../Models/adminSchema');

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }
        
        const decoded = jwt.verify(token, `${process.env.AUTH_SECRET_KEY}`);
        
        const admin = await Admin.findById(decoded._id);
        if (!admin) {
            return res.status(403).json({ message: "User is not authorized as admin" });
        }
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid", error: error.message });
    }
};

module.exports = verifyAdmin;
