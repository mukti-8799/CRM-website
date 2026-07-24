const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  email:      { type: String, trim: true, lowercase: true },
  phone:      { type: String, trim: true },
  company:    { type: String, trim: true },
  position:   { type: String, trim: true },
  type:       { type: String, enum: ['Decision Maker', 'Champion', 'Blocker', 'Influencer', 'User'], default: 'User' },
  linkedLead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  notes:      { type: String, default: '' },
  tags:       [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
