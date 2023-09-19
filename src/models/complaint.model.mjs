import { Schema } from 'mongoose';
const complaintSchema = new Schema({
    tenant: {
        type: Schema.Types.ObjectId,
        required: true
    }, complaint_name: {
        type: String,
        required: true
    }, complaint_description: {
        type: String,
        required: true
    }, complaint_date: {
        type: String,
        required: true
    }, complaint_status: {
        type: String,
        required: true
    }, complaint_image: {
        type: String,
        required: false,
        default: ''
    }
});

export default complaintSchema;