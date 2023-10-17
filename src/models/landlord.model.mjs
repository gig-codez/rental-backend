import { Schema } from 'mongoose';
import mongoose from 'mongoose';
const landlordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fcm_token: {
        type: String,
        required:false,
        default:''
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, required: false, default: '' },
},{
    timestamps: true,
  });

export default mongoose.model('landlords',landlordSchema);