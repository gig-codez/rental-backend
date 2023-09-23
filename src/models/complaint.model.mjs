import mongoose, { Schema } from "mongoose";
const complaintSchema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      required: true,
    }, property: {
        type: Schema.Types.ObjectId,
          required: false,
        
      },
    complaint_name: {
      type: String,
      required: true,
    },
    complaint_description: {
      type: String,
      required: true,
    },
    complaint_status: {
      type: String,
      required: true,
    },
    complaint_image: {
      type: String,
      required: false,
      default: "",
    },
   
    reason: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("complaints", complaintSchema);
