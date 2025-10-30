import mongoose from "mongoose";

const pollQuestionSchema = new mongoose.Schema({
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "poll_questions",
  minimize: false,
  versionKey: false
});

export default mongoose.model("PollQuestion", pollQuestionSchema);
