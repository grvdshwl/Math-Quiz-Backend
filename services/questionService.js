const Question = require("../models/Question");
const User = require("../models/User");
const { generateNewQuestionRandom } = require("../utils/helpers");

const findQuestionById = async (questionId) => {
  return await Question.findById(questionId);
};

const getActiveQuestion = async () => {
  let activeQuestion = await Question.findOne({ status: "active" });
  return activeQuestion;
};

const checkAnswer = (correctAnswer, answer) => {
  return String(correctAnswer) === String(answer);
};

const submitAnswer = async (email, questionId, answer) => {
  const question = await Question.findOne({
    _id: questionId,
    status: "active",
  });
  if (!question) throw new Error("This question has already been answered");

  if (!checkAnswer(question.answer, answer))
    throw new Error("Incorrect answer! Please try again.");

  await Question.findOneAndUpdate(
    { _id: questionId },
    { winner: email, status: "solved" },
    { new: true }
  );

  await User.findOneAndUpdate({ email }, { $inc: { score: 1 } });

  return { isWinner: true, success: true };
};

const createNewQuestion = async () => {
  const newQuestion = generateNewQuestionRandom();
  return await Question.create(newQuestion);
};

const checkQuestionWinner = async (id) => {
  const question = await findQuestionById(id);
  if (!question) throw new Error("Question not found");

  return { winner: question.winner || null, success: Boolean(question.winner) };
};

module.exports = {
  submitAnswer,
  createNewQuestion,
  checkQuestionWinner,
  getActiveQuestion,
};
