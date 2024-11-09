const Question = require("../models/Question");
const User = require("../models/User");
const { generateNewQuestionRandom } = require("../utils/helpers");

const findQuestionById = async (questionId) => {
  return await Question.findById(questionId);
};

const checkAnswer = (correctAnswer, answer) => {
  return String(correctAnswer) === String(answer);
};

const submitAnswer = async (email, questionId, answer) => {
  const question = await findQuestionById(questionId);
  if (!question) throw new Error("Question not found");

  if (question.winner)
    throw new Error("This question has already been answered");

  if (!checkAnswer(question.answer, answer))
    throw new Error("Incorrect answer");

  question.winner = email;
  await question.save();
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
};
