import mongoose, { Schema,Types } from "mongoose";
const paymentSchema = new Schema({
    amount_paid: {
        type: Number,
        required: true
    }, balance: {
        type: Number,
        required: false,
        default: 0,
    }, tenant: {
        type: Types.ObjectId,
        ref: 'tenants',
        required: true
    },property: {
        type: Types.ObjectId,
        ref: 'properties',
        required: true
    }
},{
    timestamps: true,
  });

export default mongoose.model('payments',paymentSchema);