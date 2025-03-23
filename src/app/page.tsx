"use client";
import { useState } from "react";
import { useEffect } from "react";
import { questions } from "../../questions";
import "./globals.css";

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30)

  const question = questions[currentQuestion];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    if (selectedOption !== null) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);

    // handleNext(); 
    // return;

  }, [timeLeft, selectedOption]);


  function handleStart() {
    setQuizStarted(true);
  }

  function handleSelect(option) {
    if (selectedOption) return;
    setSelectedOption(option);
    setShowAnswer(true);

    if (option === question.answer) {
      setScore((prevScore) => prevScore + 500);
    }
  }

  function handleNext() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQn) => prevQn + 1);
      setTimeLeft(30);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setShowResults(true);
    }
  }

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div className="quiz-landing">
          <div className="quiz-landing-card">
            <h1 className="quiz-title">Who Did That? A Historical Bio Quiz.</h1>
            <button className="quiz-start-btn" onClick={handleStart}>Start Quiz</button>
            <p className="questions">5 questions</p>
          </div>
        </div>
      ) : !showResults ? (
        <div className="quiz-card">
          <header className="quiz-header">
            <h2 className="text-black text-lg ">Who Did That? A Historical Bio Quiz.</h2>
            <svg className="timer-circle" viewBox="0 0 50 50">
              <circle className="timer-bg" cx="25" cy="25" r="20" />
              <circle
                className="timer-progress"
                cx="25"
                cy="25"
                r="20"
                strokeDasharray="125.6"
                strokeDashoffset={(timeLeft / 30) * 125.6}
              />
              <text x="50%" y="50%" className="timer-text">{timeLeft}</text>
            </svg>
            <p className="quiz-progress text-black">
              {currentQuestion + 1} of {questions.length}
            </p>
            <div className="quiz-score">Score: {score}</div>
          </header>
          <h2 className="quiz-question">
            {question.question}
          </h2>
          <div className="quiz-options">
            {question.options.map((option) => {
              const isCorrect = showAnswer && option === question.answer;
              const isWrong = showAnswer && option === selectedOption && option !== question.answer;
              return (
                <button
                  key={option}
                  className={`quiz-option ${ isCorrect ? "correctAnswer" : 
                    isWrong ? "wrongAnswer" :""
                    }`}
                  onClick={() => handleSelect(option)}
                  disabled={showAnswer}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <button className="quiz-next-btn" onClick={handleNext}>
              Next ➜
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-final-screen">
          <h1>Quiz Completed!</h1>
          <p>Your final score: {score}</p>
          <button
            className="quiz-restart-btn"
            onClick={() => {
              //setQuizStarted(false);
              setShowResults(false);
              setCurrentQuestion(0);
              setScore(0);
              setSelectedOption(null);
              setShowAnswer(false);
              setTimeLeft(30);
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}


