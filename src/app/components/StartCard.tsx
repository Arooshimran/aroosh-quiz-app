"use client";
import React from "react";

interface StartCardProps {
  handleStart: () => void;
}

export default function StartCard({ handleStart }: StartCardProps) {
  return (
    <div className="quiz-landing">
      <div className="quiz-landing-card">
        <h1 className="quiz-title">Who Did That? A Historical Bio Quiz.</h1>
        <button className="quiz-start-btn" onClick={handleStart}>Start Quiz</button>
        <p className="questions">5 questions</p>
      </div>
    </div>
  );
}