
import { asyncHandeler } from './../../utils/asyncHandelar.js';
import auth from './../../middleWar/auth.js';
import { addPost, allpostsWithInfo, deadline, deletePost, updatePost, userTasksWithInfo } from "./controller/post.controller.js";
import { Router } from 'express';
const router=Router()
//signUp
router.post("/",auth,asyncHandeler(addPost))
//allposts with owner 
router.get("/",asyncHandeler(allpostsWithInfo))
//allposts of one user 
router.get("/one",auth,asyncHandeler(userTasksWithInfo))
//update 
router.patch("/:id",auth,asyncHandeler(updatePost))
//delete
router.delete("/:id",auth,asyncHandeler(deletePost))
//deadlin 
router.get("/deadline",asyncHandeler(deadline))
export default router