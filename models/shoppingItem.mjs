import mongoose from "mongoose";

const shoppingItemSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  broughtBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "shopping_items",
  minimize: false,
  versionKey: false
});

export default mongoose.model("ShoppingItem", shoppingItemSchema);
