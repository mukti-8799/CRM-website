const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const deals = await Deal.find()
      .populate('assignedTo', 'name email')
      .populate('contact', 'name company')
      .sort({ createdAt: -1 });
    // Group by stage
    const kanban = { Lead: [], Qualified: [], Proposal: [], Negotiation: [], Won: [], Lost: [] };
    deals.forEach(d => { if (kanban[d.stage]) kanban[d.stage].push(d); });
    const totalValue = deals.filter(d => d.stage !== 'Lost').reduce((s, d) => s + d.value, 0);
    res.json({ success: true, kanban, totalValue, total: deals.length });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const deal = await Deal.create({ ...req.body, assignedTo: req.body.assignedTo || req.user._id });
    res.status(201).json({ success: true, deal });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!deal) return res.status(404).json({ success: false, message: 'Deal not found' });
    res.json({ success: true, deal });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Deal.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deal deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
