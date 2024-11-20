const mongoose = require('mongoose');
// const Notification = require('./notificationModel'); 

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative']
    },
    image: {
        type: String,
        required: true
    },
    productID: {
        type: Number,
        unique: true,
        required: true,
        min: [1, "should be at least 1 digit"],
        max: [999999, "should not be greater than 6 digits"]
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    minProducts: {
        type: Number,
        required: true,
        min: [1, 'Minimum products cannot be zero']
    }
});

// productSchema.pre('save', async function(next) {
//     if (this.isModified('stock') || this.isNew) {
//         if (this.minProducts > this.stock) {
//             const notification = new Notification({
//                 message: `Low stock alert for product ${this.name}. Current stock: ${this.stock}, Minimum required: ${this.minProducts}`,
//                 product: this._id, // Ensure this is the product ID
//                 farmer: this.farmer // Ensure this is the farmer ID
//             });
//             await notification.save();
//         }
//     }
//     next();
// });

// productSchema.pre('findOneAndUpdate', async function(next) {
//     const update = this.getUpdate();
//     if (update.stock || update.minProducts) {
//         const product = await this.model.findById(this._conditions._id);
//         if (update.minProducts > update.stock) {
//             const notification = new Notification({
//                 message: `Low stock alert for product ${product.name}. Current stock: ${update.stock}, Minimum required: ${update.minProducts}`,
//                 product: this._conditions._id,
//                 farmer: product.farmer // Ensure this is the farmer ID
//             });
//             await notification.save();
//         }
//     }
//     next();
// });

module.exports = mongoose.model('Product', productSchema);
