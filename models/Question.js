const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  winner: {
    type: String,
    default: null, // Initially, no winner
  },
  status: {
    type: String,
    enum: ["active", "solved"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field whenever the document is updated
questionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Compile model from schema
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
