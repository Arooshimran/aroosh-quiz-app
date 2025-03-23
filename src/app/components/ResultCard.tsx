"use client";
import React from "react";

interface ResultCardProps {
  score: number;
  handleRestart: () => void;
}

export default function ResultCard({ score, handleRestart }: ResultCardProps) {
  return (
    <div className="quiz-final-screen">
      {/* Card Overlay */}
      <div className="quiz-result-card">
        <h1>Quiz Completed!</h1>
        <p>Your final score: {score} of 5</p>
        <button className="quiz-restart-btn" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
