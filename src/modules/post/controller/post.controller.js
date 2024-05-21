
import postModel from './../../../DB/models/post.model.js';
//signUp
export const addPost=async(req, res) =>{ 
       const { title, description, deadline } = req.body;
       const { _id: userId } = req.user;
       const post=await postModel.create({
              title,
              description,
              status: 'toDo',
              userId,
              deadline,
            })
            return res.status(201).json({ message: 'Task created successfully', post });
    } 
//get allposts with user data 
export const allpostsWithInfo=async(req,res)=>{   
   const posts =await postModel.find().populate("userId")
   return res.status(200).json({message:"done",posts})
   }
//get tasks for one user 
export const userTasksWithInfo=async(req,res)=>{   
       const userId = req.user._id;
       const tasksWithUserData = await postModel.find({ userId }) .populate('userId assignTo', 'firstName lastName email age phone gender'); 
  if (!tasksWithUserData) {
    return res.status(404).json({ message: 'User tasks not found' });
  }
  return res.status(200).json({ message: 'User tasks retrieved successfully', tasksWithUserData });

       }
 // update       
 export const updatePost=async(req,res)=>{   
       const { id } = req.params;
    const userId = req.user._id; 
    const postToUpdate = await postModel.findOne({ _id: id, userId });
    if (!postToUpdate) {
      return res.status(404).json({ message: 'Post not found or user unauthorized to update this post' });
    }
    if (postToUpdate.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: ' User is not the creator of this post' });
    }
    const { title, description, status } = req.body;
    const updatedPost = await postModel.findOneAndUpdate( { _id: id, userId }, { title, description, status },{ new: true }
    );
    return res.status(200).json({ message: 'Post updated successfully', updatedPost });
       }
//delete
export const deletePost=async(req,res)=>{   
       const { id } = req.params;
    const { userId } = req.body;
    const loggedInUserId = req.user._id;
    if (userId !== loggedInUserId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }
    const deletedPost = await postModel.findOneAndDelete({ _id: id, userId });
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json({ message: 'Post deleted successfully', deletedPost });
       }
// deadline
import moment from 'moment';

export const deadline = async (req, res) => {
  try {
    const currentDate = moment().toDate();
    const posts = await postModel
      .find({
        status: { $ne: 'done' }, // Not equal to 'done'
        deadline: { $lt: currentDate }, // Less than current date
      })
      .populate('userId');
      

    return res.status(200).json({ message: 'Done', posts });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

