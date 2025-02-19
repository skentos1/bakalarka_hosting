// models/Analysis.js
import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // anonym môže byť bez user
  },
  suggestions: {
    type: Object,
    required: true,
  },
  formData: {
    type: Object,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
