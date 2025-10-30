import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  title: { type: String },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  collection: 'threads',
  timestamps: true
});

// Validation : un thread ne peut pas appartenir à un groupe et un event en même temps
threadSchema.pre('save', function(next) {
  if (this.group && this.event) {
    return next(new Error("Un thread ne peut pas appartenir à la fois à un groupe et un événement"));
  }
  if (!this.group && !this.event) {
    return next(new Error("Un thread doit appartenir soit à un groupe, soit à un événement"));
  }
  next();
});

export default mongoose.model('Thread', threadSchema);
