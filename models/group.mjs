import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  coverPhoto: { type: String },
  type: { type: String, enum: ['public', 'private', 'secret'], default: 'public' },
  allowPosts: { type: Boolean, default: true },       // Les membres peuvent publier
  allowEvents: { type: Boolean, default: true },      // Les membres peuvent créer des événements
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Liste des membres
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  collection: 'groups',
  timestamps: true
});

export default mongoose.model('Group', groupSchema);
