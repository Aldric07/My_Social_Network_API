import mongoose from "mongoose";

const photoCommentSchema = new mongoose.Schema({
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "photo_comments",
  minimize: false,
  versionKey: false
});

export default mongoose.model("PhotoComment", photoCommentSchema);
