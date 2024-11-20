    const Sale = require('../Models/salesSchema');
    const Product = require('../Models/productSchema');
    const mongoose = require('mongoose');

    exports.createSale = async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const { productID, quantity, customer } = req.body;
    
            const product = await Product.findOne({
                _id: new mongoose.Types.ObjectId(productID),
                farmer: req.user._id
            }).session(session);
    
            if (!product) {
                await session.abortTransaction();
                session.endSession();
                return res.status(405).json({ message: 'Product not found' });
            }
    
            if (product.stock < quantity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: 'Insufficient stock' });
            }
    
            const totalPrice = product.price * quantity;
    
            const newSale = new Sale({
                product: product._id,
                quantity,
                totalPrice,
                customer,
                farmer: req.user._id
            });
    
            const savedSale = await newSale.save({ session });
    
            product.stock -= quantity;
            await product.save({ session });
    
            await session.commitTransaction();
            session.endSession();
    
            return res.status(201).json({ message: 'Sale recorded successfully', sale: savedSale });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ message: 'Server Error', error: error.message });
        }
    };
    

    exports.getSales = async (req, res) => {
        try {
            const sales = await Sale.find({ farmer: req.user._id })
                .populate('product', 'name description price') 
                .sort({ saleDate: -1 })
                .exec();
            return res.status(200).json(sales);
        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error: error.message });
        }
    };

    exports.deleteSales = async (req,res) => {
        try {
            const saleId = req.params.id;
            const sale = await Sale.findByIdAndDelete(saleId);
            if(!sale){
                return res.status(404).json({ message: 'Sale not found' });
            }
            return res.status(200).json({ message: 'Sale deleted successfully' });
        }catch (error) {
            return res.status(500).json({ message: 'Server Error', error: error.message });
        }
    }

    exports.getSaleById = async (req, res) => {
        try {
            const saleId = req.params.id;
            const sale = await Sale.findById(saleId).populate('product', 'name price'); // Populate product details if needed

            if (!sale) {
                return res.status(404).json({ message: "Sale not found" });
            }

            return res.status(200).json(sale);
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    };
