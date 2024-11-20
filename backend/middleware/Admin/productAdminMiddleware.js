const Product = require("../../Models/productSchema");

exports.fetchProducts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Invalid Farmer ID" });
    const products = await Product.find({ farmer: id });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.addProduct = async (req, res) => {
    const {farmerId} = req.params;
  try {
    let productID;

        while (!productID) {
            const tempProductID = Math.floor(100000 + Math.random() * 900000); 
            const existingProduct = await Product.findOne({ productID: tempProductID });
            if (!existingProduct) {
                productID = tempProductID; 
            }
        }

        const newProduct = {
            ...req.body,
            productID: productID,
            farmer : farmerId 
        };
        const savedProduct = await Product.create(newProduct);
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.delProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
