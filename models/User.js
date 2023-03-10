import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
   username:{type:String,default:null,required:true},
   email:{type:String,unique:true,required:true},
   password:{type:String,required:true},
   token:{type:String}
});

export default mongoose.model('User', userSchema);