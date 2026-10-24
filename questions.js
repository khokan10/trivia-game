// questions.js
// this file stores all the trivia questions for the quiz game

// array of trivia question objects
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Mode Link",
      "Home Tool Management Layer"
    ],
    // 1-based index of correct option
    correctAnswer: 1,
    explanation: "HTML stands for Hyper Text Markup Language."
  },
  {
    question: "Which keyword is used to declare a variable that cannot be reassigned in JavaScript?",
    options: [
      "var",
      "let",
      "const",
      "static"
    ],
    correctAnswer: 3,
    explanation: "'const' creates block-scoped variables that cannot be reassigned."
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: [
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn"
    ],
    correctAnswer: 2,
    explanation: "Mars is often called the Red Planet because of iron oxide on its surface."
  },
  {
    question: "What is the result of typeof null in JavaScript?",
    options: [
      "'null'",
      "'undefined'",
      "'object'",
      "'number'"
    ],
    correctAnswer: 3,
    explanation: "In JavaScript, typeof null returns 'object' due to a historical legacy bug."
  },
  {
    question: "Which array method adds one or more elements to the end of an array?",
    options: [
      "shift()",
      "pop()",
      "unshift()",
      "push()"
    ],
    correctAnswer: 4,
    explanation: "push() adds one or more elements to the end of an array and returns the new length."
  }
];

// export the questions array so index.js can use it
module.exports = questions;
