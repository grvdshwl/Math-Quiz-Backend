const express = require("express");
const {
  submitAnswer,
  getCurrentQuestion,
  checkIsQuestionAnswered,
} = require("../controllers/quizController");

const router = express.Router();

router.post("/submitAnswer", submitAnswer);
router.get("/currentQuestion", getCurrentQuestion);
router.get("/checkIsQuestionAnswered/:id", checkIsQuestionAnswered);

module.exports = router;
