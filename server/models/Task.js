const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title:      { type: String, required: true, trim: true },
  description:{ type: String, default: '' },
  type:       { type: String, enum: ['Call', 'Email', 'Meeting', 'Follow-up', 'Task'], default: 'Task' },
  status:     { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  priority:   { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate:    { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  relatedLead:{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  relatedDeal:{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
