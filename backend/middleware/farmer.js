const Farmer = require('../Models/farmerSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { farmerName, email, phone, address, password } = req.body;

    try {
        const farmer = await Farmer.findOne({ email });
        if (farmer) {
            return res.status(400).json({ errors: [{ msg: "Farmer already exists" }] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFarmer = await Farmer.create({
            farmerName,
            email,
            phone,
            address,
            password: hashedPassword, 
        });

        return res.status(200).json({ message: "Farmer registered successfully", farmer: newFarmer });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const farmer = await Farmer.findOne({ email });
        if (!farmer) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, farmer.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const token = jwt.sign({ farmer }, `${process.env.AUTH_SECRET_KEY}`, { expiresIn: '5h' });
        console.log(token);

        return res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}


exports.updateFarmer = async (req, res) => {
    const farmerEmail = req.user.farmer.email;
    const updates = req.body;

    try {
        const updatedFarmer = await Farmer.findOneAndUpdate({ email: farmerEmail }, updates, { new: true });

        if (!updatedFarmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }

        return res.status(200).json({ message: "Farmer updated successfully", farmer: updatedFarmer });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

exports.deleteFarmer = async (req, res) => {
    const farmerEmail = req.user.farmer.email;

    try {
        const deletedFarmer = await Farmer.findOneAndDelete({ email: farmerEmail });

        if (!deletedFarmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }

        return res.status(200).json({ message: "Farmer deleted successfully", farmer: deletedFarmer });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

exports.getFarmer = async (req, res) => {
    try {
        const { email } = req.user.farmer;
        console.log(email);

        const farmer = await Farmer.findOne({ email });

        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }

        return res.status(200).json({ farmer });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}




