import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
}, {
  collection: 'messages',
  timestamps: true
});

export default mongoose.model('Message', messageSchema);
