import userModel from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from"jsonwebtoken"

//all user
export const allUser=async(req, res) =>{
const user=await userModel.find()
 return res.json({message:'done',user})}
//signup
 export const signUp=async(req,res,next)=>{
        const{email,password}=req.body
        const isExist=await userModel.findOne({email})
        if (isExist) {
            return next (new Error ("email or password not exist",{cause:404})) 
        }
        const hashPassword=bcrypt.hashSync(password,8)
        req.body.password=hashPassword
        const newUser =await userModel.create(req.body)
        return res.status(200).json({message:'done',newUser})
    }
   //signIn 
 export const signIn=async(req,res,next)=>{
        const{email,password}=req.body
        const user=await userModel.findOne({email})
        if (!user) {
            return next (new Error ("email or password not exist",{cause:404})) 
        }
        const isMatch= bcrypt.compareSync(password,user.password)
        if (!isMatch) {
            return next (new Error ("email or password not exist",{cause:400}))
        }
        const token =jwt.sign({_id:user._id,email:user.email},"enass",{expiresIn:60*60})
        return res.status(200).json({message:'done',token})
    
 }
//updated
 export const updatedUser=async(req,res,next)=>{
        const{age,firstName,lastName}=req.body
        const updatedUser=await userModel.findOneAndUpdate({_id:req.user._id},{age,firstName,lastName},{new:true})
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
         return res.status(200).json({message:"done",updatedUser})
     
}
//delete
export const deleteUser=async(req,res,next)=>{
    const deleteUser=await userModel.findOneAndDelete({_id:req.user._id})
    return deleteUser? res.status(200).json({message:"done",deleteUser}):res.status(404).json({message:"invalid id"})
 
}
//soft delete 
export const softDelete=async(req,res,next)=>{
    const softDeleteUser = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { isDeleted: true },
        { new: true }
      );
  
      if (!softDeleteUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User soft deleted successfully', softDeleteUser });
}
//change password                  
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    console.log(user.password)
    console.log(req.user)
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: 'Password changed successfully', updatedUser: user });
  } catch (error) {
    next(error);
  }
};



