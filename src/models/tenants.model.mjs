import { Schema, Types } from "mongoose";

const tenantSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    }, password: {
        type: String,
        required: false,
        default: ''
    }, profile: {
        type: String,
        required: false,
        default: ''
    },
    property: {
        type: Types.ObjectId,
        required: false,
        ref: 'property',
    }, landlord: {
        type: Types.ObjectId,
        required: false,
        ref: 'landlord',
    }
});
export default tenantSchema;