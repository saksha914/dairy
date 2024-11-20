const Farmer = require('../../Models/farmerSchema')
const bcrypt = require('bcrypt');

exports.createFarmer = async (req, res) => {
    const { farmerName, email, password, phone, address } = req.body;

    try {
        const farmer = await Farmer.findOne({ email });
        if (farmer) {
            return res.status(400).json({ errors: [{ msg: 'Farmer already exists' }] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFarmer = await Farmer.create({
            farmerName,
            email,
            password: hashedPassword,
            phone,
            address
        });

        return res.status(200).json({ message: 'Farmer registered successfully', farmer: newFarmer });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateFarmer = async (req, res) => {
    const { id } = req.params;
    const { farmerName, phone, address } = req.body;

    try {
        const updatedFarmer = await Farmer.findByIdAndUpdate(
            id,
            { farmerName, phone, address},
            { new: true }
        );

        if (!updatedFarmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        return res.status(200).json({ message: 'Farmer updated successfully', farmer: updatedFarmer });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteFarmer = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedFarmer = await Farmer.findByIdAndDelete(id);

        if (!deletedFarmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        return res.status(200).json({ message: 'Farmer deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.fetchFarmers = async (req, res) => {
        try {
        const farmer = await Farmer.find();

        return res.status(200).json({ farmer });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error'});
    }
}