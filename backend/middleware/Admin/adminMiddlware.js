const Admin = require("../../Models/adminSchema");
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
  const { adminName, email, password, phone } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Admin already exists" }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      adminName,
      email,
      password: hashedPassword,
      phone,
    });

    return res
      .status(200)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    // console.log(admin)

    const isMatch = await bcrypt.compare(password, admin.password);
    // console.log(isMatch);
    if (isMatch) {
        return res.status(200).json({ message: "Logged in successfully"});
    }
    // const token = jwt.sign({ admin }, process.env.AUTH_SECRET_KEY, { expiresIn: '5h' });
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  const { adminName, email, phone } = req.body;

  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { email },
      { adminName, phone, email },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res
      .status(200)
      .json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const deletedAdmin = await Admin.findOneAndDelete({ email });

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

exports.getAdmin = async (req, res) => {
  const { email } = req.params;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ admin });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
