import mongoose from "mongoose";
export const connection =async()=>{
    return await mongoose.connect("mongodb://127.0.0.1:27017/assign7")
    .then(
        ()=>{
            console.log('Connected to MongoDB');
        }
    )
    .catch ((error)=> {
        console.log(error)
        console.log('Error connecting to MongoDB:', error.message);
      } )
} 