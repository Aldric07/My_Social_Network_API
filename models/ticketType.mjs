import mongoose from "mongoose";

const ticketTypeSchema = new mongoose.Schema({
  event: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event", 
    required: true 
  },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: "ticket_types",
  minimize: false,
  versionKey: false
});

export default mongoose.model("TicketType", ticketTypeSchema);
