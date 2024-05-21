import { Router } from "express";
import { allUser, changePassword, deleteUser, signIn, signUp, softDelete, updatedUser } from "./controller/user.controller.js";
import { asyncHandeler } from './../../utils/asyncHandelar.js';
import auth from './../../middleWar/auth.js';
const router =Router()
//get all user
router.get('/', allUser)
//sign up
router.post("/",asyncHandeler(signUp))
//sign In
router.post("/signIn",asyncHandeler(signIn))
//updated
router.patch("/update/:id",auth,asyncHandeler(updatedUser))
//delete
router.delete("/:id",auth,asyncHandeler(deleteUser))
//soft delete
router.put("/:id",auth,asyncHandeler(softDelete))
//change password 
router.patch("/change",auth,changePassword)
 

export default router; 