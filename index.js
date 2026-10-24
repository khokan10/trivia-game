// index.js
// interactive CLI trivia game

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const questions = require("./questions");

// time limit in seconds for each question
const TIME_LIMIT = 10;

// total maximum time allowed for the whole game in seconds
const MAX_GAME_TIME = 120;

// function to print welcome banner and game instructions
function displayWelcome() {
  console.log("\n=========================================");
  console.log("       WELCOME TO THE TRIVIA QUIZ!       ");
  console.log("=========================================");
  console.log("Test your knowledge with 5 fun questions.");
  console.log("Each question has 4 choices (enter 1, 2, 3, or 4).");
  console.log(`⏱️  Question time limit: ${TIME_LIMIT} seconds per question`);
  console.log(`⌛ Game duration limit: ${MAX_GAME_TIME} seconds total`);
  console.log("Try to get as many right as possible!");
  console.log("=========================================\n");
}

// function to display a single question and its options
function displayQuestion(questionObj, questionNumber, totalQuestions) {
  console.log(`\n-----------------------------------------`);
  console.log(`Question ${questionNumber} of ${totalQuestions}:`);
  console.log(`${questionObj.question}\n`);

  // using forEach to print all options
  questionObj.options.forEach((option, index) => {
    console.log(`  ${index + 1}) ${option}`);
  });
  console.log(`-----------------------------------------`);
  console.log(`⏱️  Timer: You have ${TIME_LIMIT} seconds to answer!`);
}

// function to ask a question with a timer using setTimeout
async function askQuestionWithTimer(rl, questionObj, questionNumber, totalQuestions) {
  displayQuestion(questionObj, questionNumber, totalQuestions);

  // setup an abort controller to stop waiting when the timer expires
  const controller = new AbortController();
  let timedOut = false;

  // asynchronous timer for the question
  const timer = setTimeout(() => {
    timedOut = true;
    console.log(`\n⏰ Time's up! You took more than ${TIME_LIMIT} seconds to answer.`);
    controller.abort();
  }, TIME_LIMIT * 1000);

  let rawAnswer = "";
  try {
    rawAnswer = await rl.question("Enter your choice (1-4): ", {
      signal: controller.signal
    });
  } catch (err) {
    if (err.name === "AbortError") {
      // user ran out of time
      return {
        question: questionObj.question,
        userAnswer: "Time Expired",
        correctAnswer: `${questionObj.correctAnswer}) ${questionObj.options[questionObj.correctAnswer - 1]}`,
        isCorrect: false,
        timedOut: true
      };
    }
    throw err;
  } finally {
    // clear timer if user answered before timeout
    clearTimeout(timer);
  }

  const choiceNum = parseInt(rawAnswer.trim(), 10);
  const isValidChoice = choiceNum >= 1 && choiceNum <= questionObj.options.length;
  const isCorrect = isValidChoice && choiceNum === questionObj.correctAnswer;

  // provide immediate feedback
  if (isCorrect) {
    console.log("✅ Correct! Excellent work!");
    console.log(`   Note: ${questionObj.explanation}`);
  } else {
    const correctText = questionObj.options[questionObj.correctAnswer - 1];
    console.log(`❌ Incorrect! The correct answer is: ${questionObj.correctAnswer}) ${correctText}`);
    console.log(`   Note: ${questionObj.explanation}`);
  }

  const userChoiceText = isValidChoice
    ? `${choiceNum}) ${questionObj.options[choiceNum - 1]}`
    : `Invalid input ("${rawAnswer.trim()}")`;

  return {
    question: questionObj.question,
    userAnswer: userChoiceText,
    correctAnswer: `${questionObj.correctAnswer}) ${questionObj.options[questionObj.correctAnswer - 1]}`,
    isCorrect: isCorrect,
    timedOut: false
  };
}

// function to display final game results using array methods
function displayGameOver(results, durationSeconds) {
  console.log("\n=========================================");
  console.log("               GAME OVER!                ");
  console.log("=========================================");

  // array iteration method 1: filter() to count correct answers
  const correctResults = results.filter((item) => item.isCorrect);
  const correctCount = correctResults.length;
  const totalQuestions = results.length;

  // array iteration method 2: reduce() to calculate total score points (10 points each)
  const totalScore = results.reduce((sum, item) => {
    return item.isCorrect ? sum + 10 : sum;
  }, 0);
  const maxPossibleScore = totalQuestions * 10;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  console.log(`⏱️  Total Game Duration: ${durationSeconds} seconds (Limit: ${MAX_GAME_TIME}s)`);
  console.log(`🎯 Score: ${correctCount} / ${totalQuestions} (${percentage}%)`);
  console.log(`⭐ Total Points: ${totalScore} / ${maxPossibleScore} pts`);

  // feedback message based on score
  if (percentage === 100) {
    console.log("🏆 Outstanding! You got a perfect score!");
  } else if (percentage >= 60) {
    console.log("👏 Well done! Good job!");
  } else {
    console.log("💡 Keep practicing! You can do better next time!");
  }

  console.log("\n--- Detailed Results Breakdown ---");

  // array iteration method 3: map() to format review lines
  const reviewLines = results.map((item, index) => {
    const statusIcon = item.timedOut
      ? "⏰ TIMED OUT"
      : item.isCorrect
      ? "✅ CORRECT"
      : "❌ INCORRECT";
    return `Q${index + 1}: ${item.question}\n   Your answer:    ${item.userAnswer}\n   Correct answer: ${item.correctAnswer}\n   Result:         ${statusIcon}`;
  });

  // print each formatted summary item
  reviewLines.forEach((line) => {
    console.log(line);
    console.log("");
  });

  console.log("=========================================");
  console.log("        Thank you for playing!           ");
  console.log("=========================================\n");
}

// main game runner function
async function startQuiz() {
  const rl = readline.createInterface({ input, output });
  const results = [];

  try {
    displayWelcome();

    // ask user if they are ready to begin
    await rl.question("Press Enter when you are ready to start the quiz...");

    // keep time for the game duration
    const gameStartTime = Date.now();

    // loop through each question sequentially
    for (let i = 0; i < questions.length; i++) {
      // check if total game duration has been exceeded
      const currentElapsed = Math.round((Date.now() - gameStartTime) / 1000);
      if (currentElapsed >= MAX_GAME_TIME) {
        console.log("\n⌛ The overall game time limit has been reached!");
        break;
      }

      const currentQuestion = questions[i];
      const result = await askQuestionWithTimer(rl, currentQuestion, i + 1, questions.length);
      results.push(result);
    }

    const gameEndTime = Date.now();
    const durationSeconds = Math.round((gameEndTime - gameStartTime) / 1000);

    // display final feedback and score summary
    displayGameOver(results, durationSeconds);
  } finally {
    rl.close();
  }
}

// run the quiz if executed directly
if (require.main === module) {
  startQuiz();
}

module.exports = {
  startQuiz,
  displayWelcome,
  displayQuestion,
  askQuestionWithTimer,
  displayGameOver,
  TIME_LIMIT,
  MAX_GAME_TIME
};
