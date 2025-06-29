const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const { authMiddleware } = require('../middleware/auth');
const Data = require('../models/Data'); // This should now work
const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only .xls and .xlsx files
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .xls or .xlsx files are allowed'), false);
    }
  },
});

// Upload route
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    console.log('Current directory:', process.cwd());
    console.log('Reading file:', `uploads/${req.file.filename}`);
    const workbook = XLSX.readFile(`uploads/${req.file.filename}`);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('Parsed data:', data);
    // Save to MongoDB
    const dataEntry = new Data({
      userId: req.user.id,
      filename: req.file.filename,
      data,
    });
    await dataEntry.save();
    res.json({ file: req.file.filename, data });
  } catch (error) {
    console.error('Error parsing file:', error);
    res.status(500).json({ error: 'Failed to parse or save Excel file' });
  }
});

module.exports = router;