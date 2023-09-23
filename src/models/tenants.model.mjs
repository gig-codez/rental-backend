import { Schema, Types } from "mongoose";
import mongoose from "mongoose";
const tenantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
    default: "",
  },
  profile: {
    type: String,
    required: false,
    default: "",
  },
  property: {
    type: Types.ObjectId,
    required: false,
    ref: "property",
  },
  landlord: {
    type: Types.ObjectId,
    required: false,
    ref: "landlord",
  },
  monthly_rent: {
    type: Number,
    required: false,
    default: 0,
  },
  power_fee: {
    type: Number,
      required: false,
    default: 0,
  },
  power_status: {
    type: Number,
    required: false,
    default: 0,
  },
  otp: {
    type: Number,
    required: false,
    default: 0,
  },
  fcm_token: {
    type: String,
      required: false,
    default: "",
  },
  isEmailVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
},{
    timestamps: true,
  });
export default mongoose.model("tenants", tenantSchema);
