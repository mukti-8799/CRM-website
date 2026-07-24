const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title:      { type: String, required: true, trim: true },
  company:    { type: String, trim: true },
  value:      { type: Number, required: true, default: 0 },
  stage:      { type: String, enum: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'], default: 'Lead' },
  probability:{ type: Number, min: 0, max: 100, default: 10 },
  closeDate:  { type: Date },
  contact:    { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes:      { type: String, default: '' },
  isHot:      { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
