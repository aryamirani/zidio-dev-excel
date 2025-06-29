const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Data = require('../models/Data');
const router = express.Router();

// Get column names for the latest uploaded file
router.get('/columns', authMiddleware, async (req, res) => {
  try {
    const latestData = await Data.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!latestData || !latestData.data.length) {
      return res.status(404).json({ error: 'No data found' });
    }
    const columns = Object.keys(latestData.data[0]);
    res.json({ columns });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch columns' });
  }
});

// Get data for a specific column
router.get('/column/:columnName', authMiddleware, async (req, res) => {
  try {
    const latestData = await Data.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!latestData || !latestData.data.length) {
      return res.status(404).json({ error: 'No data found' });
    }
    const columnName = req.params.columnName;
    if (!Object.keys(latestData.data[0]).includes(columnName)) {
      return res.status(400).json({ error: 'Invalid column name' });
    }
    const columnData = latestData.data.map(row => row[columnName]);
    res.json({ columnName, columnData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch column data' });
  }
});

module.exports = router;