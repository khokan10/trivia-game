# Interactive Trivia Quiz CLI

An interactive command-line trivia quiz game built with JavaScript (Node.js).

## Features
- **Sequential Questions**: Presents questions one by one with 4 multiple-choice options.
- **Immediate Feedback**: Gives real-time feedback after answering each question (correct/incorrect with explanations).
- **Asynchronous Timers**: 
  - 10-second timer cap per question using `setTimeout` and `AbortController`.
  - Overall game duration tracking and time limit (120 seconds).
- **Score Tracking & Game Over Summary**: Stores user selections and calculates final score and percentage.
- **Array Iteration Methods**:
  - `forEach()`: Displays numbered answer options for each question.
  - `filter()`: Calculates the total count of correct answers.
  - `reduce()`: Calculates total accumulated score points.
  - `map()`: Formats the detailed post-game review breakdown.

## Prerequisites
- Node.js (version 18 or higher)

## How to Run
In the project directory, run:
```bash
node index.js
```
or
```bash
npm start
```

## How to Play
1. Run the application in your terminal.
2. Press **Enter** to start the quiz.
3. For each question, type the number corresponding to your chosen option (`1`, `2`, `3`, or `4`) and press **Enter**.
4. You have 10 seconds per question. If time runs out, the question is marked as timed out.
5. Review your final score and detailed breakdown at the end of the game!
