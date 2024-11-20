const Product = require('../Models/productSchema');

exports.createProduct = async (req, res) => {
    try {
        let productID;

        while (!productID) {
            const tempProductID = Math.floor(100000 + Math.random() * 900000); 
            const existingProduct = await Product.findOne({ productID: tempProductID });
            if (!existingProduct) {
                productID = tempProductID; 
            }
        }

        const newProductData = {
            ...req.body,
            productID: productID, 
            farmer: req.user._id  
        };

        const savedProduct = await Product.create(newProductData);

        return res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.user._id });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ productID: req.params.id, farmer: req.user._id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productID: req.params.id, farmer: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ productID: req.params.id, farmer: req.user._id });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.fetchAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

