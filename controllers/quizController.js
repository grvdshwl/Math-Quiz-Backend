const { getUserDetailsByEmail } = require("../services/authService");
const questionService = require("../services/questionService");

//* Todo: Improve this by using a Redis instance to implement a lock for the question ID,
//* and have submitted results picked up from a queue for processing.
const submitAnswer = async (req, res) => {
  const { email, questionId, answer } = req.body;
  try {
    const response = await questionService.submitAnswer(
      email,
      questionId,
      answer
    );
    const user = await getUserDetailsByEmail(email);
    await questionService.createNewQuestion();
    return res.status(200).json({ ...response, user });
  } catch (error) {
    const status =
      error.message === "Question not found" ||
      error.message === "This question has already been answered"
        ? 400
        : 500;
    return res.status(status).json({ message: error.message, success: false });
  }
};

const getCurrentQuestion = async (req, res) => {
  try {
    const activeQuestion = await questionService.getActiveQuestion();
    let finalQuestion;
    if (activeQuestion) {
      finalQuestion = activeQuestion;
    } else {
      const newQuestion = await questionService.createNewQuestion();
      finalQuestion = newQuestion;
    }
    return res.status(200).json({ question: finalQuestion, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving the current question.",
      success: false,
    });
  }
};

//* This can be improved by using sockets for real-time communication, allowing immediate updates and reducing delays
const checkIsQuestionAnswered = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await questionService.checkQuestionWinner(id);
    return res.status(200).json(response);
  } catch (error) {
    const status = error.message === "Question not found" ? 404 : 500;
    return res.status(status).json({ message: error.message, success: false });
  }
};

module.exports = { submitAnswer, getCurrentQuestion, checkIsQuestionAnswered };
