import { Schema, Types } from 'mongoose';
const propertySchema = new Schema({

    name: { type: String, required: true },
    address: { type: String, required: true },
    floors: {
        type: Number,
        required: true
    },
    landlord: {
        type: Types.ObjectId,
        required: true,
    }
});
export default propertySchema;