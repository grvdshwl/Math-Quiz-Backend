const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Add a minimum length for the password
  },
  name: { type: String, required: true, minlength: 6 },
  score: {
    type: Number,
    default: 0,
  },
  highScore: {
    type: Number,
    default: 0,
  },
  questionsAnswered: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
      answeredAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
