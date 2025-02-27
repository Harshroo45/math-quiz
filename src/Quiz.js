import React, { useState } from 'react';
import './App.css';

const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is 3 + 5?", options: ["7", "8", "9", "10"], answer: "8" },
  { question: "What is 5 + 7?", options: ["11", "12", "13", "14"], answer: "12" },
  { question: "What is 6 + 6?", options: ["11", "12", "13", "14"], answer: "12" },
  { question: "What is 7 + 8?", options: ["14", "15", "16", "17"], answer: "15" },
  { question: "What is 9 + 3?", options: ["11", "12", "13", "14"], answer: "12" },
  { question: "What is 10 + 10?", options: ["19", "20", "21", "22"], answer: "20" },
  { question: "What is 11 + 9?", options: ["19", "20", "21", "22"], answer: "20" },
  { question: "What is 12 + 8?", options: ["19", "20", "21", "22"], answer: "20" },
  { question: "What is 13 + 7?", options: ["19", "20", "21", "22"], answer: "20" },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div className="welcome-screen">
          <h1 className="welcome-title">Welcome to the Math Quiz</h1>
          <button onClick={handleStartQuiz} className="start-quiz-button">
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                className={`option-button ${selectedOption === option ? (option === questions[currentQuestion].answer ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
            {selectedOption && selectedOption !== questions[currentQuestion].answer && (
              <div className="correct-answer">
                Correct answer: {questions[currentQuestion].answer}
              </div>
            )}
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePreviousQuestion} className="nav-button" disabled={currentQuestion === 0}>
              Back
            </button>
            <button onClick={handleNextQuestion} className="nav-button" disabled={selectedOption === null}>
              {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;