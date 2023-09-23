import mongoose, { Schema,Types } from "mongoose";
const paymentSchema = new Schema({
    amount_paid: {
        type: Number,
        required: true
    }, balance: {
        type: Number,
        required: false,
        default: 0,
    }, date: {
        type: String,
        required: true
    }, tenant: {
        type: Types.ObjectId,
        ref: 'tenants',
        required: true
    }
},{
    timestamps: true,
  });

export default mongoose.model('payments',paymentSchema);