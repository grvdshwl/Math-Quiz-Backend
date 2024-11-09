const generateNewQuestionRandom = () => {
  // Randomly select one of the operations (addition, subtraction, multiplication)
  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  // Generate two random numbers for the question
  const number1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
  const number2 = Math.floor(Math.random() * 10) + 1; // 1 to 10

  let questionText = "";
  let answer = 0;

  // Generate the question based on the selected operation
  switch (operation) {
    case "+":
      questionText = `What is ${number1} + ${number2}?`;
      answer = number1 + number2;
      break;

    case "-":
      questionText = `What is ${number1} - ${number2}?`;
      answer = number1 - number2;
      break;

    case "*":
      questionText = `What is ${number1} * ${number2}?`;
      answer = number1 * number2;
      break;

    default:
      break;
  }

  return { text: questionText, answer };
};

module.exports = { generateNewQuestionRandom };
