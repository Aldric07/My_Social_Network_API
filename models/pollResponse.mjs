import mongoose from "mongoose";

const pollResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PollQuestion",
    required: true
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  selectedOption: {
    type: String,
    required: true
  },
  respondedAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "poll_responses",
  minimize: false,
  versionKey: false
});

export default mongoose.model("PollResponse", pollResponseSchema);
