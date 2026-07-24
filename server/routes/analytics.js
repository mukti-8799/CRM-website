const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Deal = require('../models/Deal');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

// GET dashboard analytics summary
router.get('/summary', protect, async (req, res) => {
  try {
    const [totalLeads, hotLeads, converted, pendingTasks, deals] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'Hot' }),
      Lead.countDocuments({ status: 'Converted' }),
      Task.countDocuments({ status: 'Pending' }),
      Deal.find({ stage: { $ne: 'Lost' } }),
    ]);

    const pipelineValue = deals.reduce((sum, d) => sum + d.value, 0);
    const wonDeals = deals.filter(d => d.stage === 'Won');
    const winRate = deals.length ? Math.round((wonDeals.length / deals.length) * 100) : 0;

    res.json({
      success: true,
      data: { totalLeads, hotLeads, converted, pendingTasks, pipelineValue, winRate, dealsCount: deals.length }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// GET lead sources breakdown
router.get('/lead-sources', protect, async (req, res) => {
  try {
    const sources = await Lead.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, sources });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// GET pipeline by stage
router.get('/pipeline-stages', protect, async (req, res) => {
  try {
    const stages = await Deal.aggregate([
      { $group: { _id: '$stage', count: { $sum: 1 }, value: { $sum: '$value' } } },
      { $sort: { value: -1 } }
    ]);
    res.json({ success: true, stages });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
