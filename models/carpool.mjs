import mongoose from "mongoose";

const carpoolSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  departureLocation: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  maxDelay: {
    type: Number, // minutes
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "carpools",
  minimize: false,
  versionKey: false
});

export default mongoose.model("Carpool", carpoolSchema);
