const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  data: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Data', dataSchema);