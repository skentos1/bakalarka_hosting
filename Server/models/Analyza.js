// server/models/Analysis.js
import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyData: {
    type: String,
    required: true,
  },
  analysisResult: {
    type: Object, // Ukladanie AI generovaného JSON
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Analysis', AnalysisSchema);
