const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, trim: true, lowercase: true },
  phone:       { type: String, trim: true },
  company:     { type: String, trim: true },
  source:      { type: String, enum: ['Website', 'Referral', 'Global Enquiry', 'Social Media', 'Cold Call', 'Event', 'Other'], default: 'Website' },
  status:      { type: String, enum: ['New', 'Hot', 'Follow-up', 'Converted', 'Lost'], default: 'New' },
  value:       { type: Number, default: 0 },
  notes:       { type: String, default: '' },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags:        [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
