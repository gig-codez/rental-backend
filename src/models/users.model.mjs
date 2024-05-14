import mongoose, {Schema} from "mongoose";

const usersModel = new Schema({
    firstName:{ type: String, required: true},
    lastName:{type: String, required: true},
    username:{type:String, required: true},
    email:{type:String, required: true},
    password:{type: String}
},{
    timestamps: true,
})

export default mongoose.model('users',usersModel);