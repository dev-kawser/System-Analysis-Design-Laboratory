import mongoose from 'mongoose'

// const orderSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     items: [{
//         product: { type: String, required: true, ref: 'product' },
//         quantity: { type: Number, required: true }
//     }],
//     amount: { type: Number, required: true },
//     address: { type: String, required: true, ref: 'address' },
//     status: { type: String, default: 'Order Placed Successfully.' },
//     paymentType: { type: String, required: true },
//     isPaid: { type: Boolean, required: true, default: false },
//     date: { type: Number, required: true }
// }, { timestamps: true})

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        product: { type: String, required: true, ref: 'product' },
        quantity: { type: Number, required: true }
    }],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: 'address' },
    status: { type: String, default: 'Order Placed Successfully.' },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt
});

const Order = mongoose.models.order || mongoose.model('order', orderSchema);
export default Order;
