import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  caption: {
    type: String
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "photos",
  minimize: false,
  versionKey: false
});

export default mongoose.model("Photo", photoSchema);
