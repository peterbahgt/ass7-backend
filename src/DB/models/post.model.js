import { Schema,Types,model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['toDo', 'doing', 'done'],
      default: 'toDo',
    },
    userId: {
      type:Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    assignTo: {
      type:Types.ObjectId,
      ref: 'User', 
    },
    deadline: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const postModel =model("Post",postSchema)

export default postModel;
