import { Schema,Types,model } from "mongoose";

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true
    }, 
     lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    phone:String,
    gender:{
        type:String,
        default:"male",
        enum:["female","male"]
    }, isDeleted: {
        type: Boolean,
        default: false,
      }
}
,{
    timestamps:true
})
const userModel =model("User",userSchema)
export default userModel    