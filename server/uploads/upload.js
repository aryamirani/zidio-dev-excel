const express = require('express');
const multer = require('multer');
const { authMiddleware } = require('../middleware/auth');
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
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ file: req.file.filename });
});

module.exports = router;