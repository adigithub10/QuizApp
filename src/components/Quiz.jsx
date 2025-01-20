

import { useState, useCallback, useMemo } from "react";
import QUESTIONS from "../questions.js";
import OverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  // State to track user's answers
  const [userAnswers, setuserAnswers] = useState([]);

  // Handlers for selecting and skipping answers
  const handleSelectAnswer = useCallback(
    (selectedAns) => {
      setuserAnswers((prevUserAns) => [...prevUserAns, selectedAns]);
    },
    []
  );

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  // Active question and quiz status
  const activeQuestionIndex = userAnswers.length;
  const quizIsOver = activeQuestionIndex === QUESTIONS.length;

  if (quizIsOver) {
    return (
      <div id="summary">
        <img src={OverImg} alt="Quiz Over" />
        <h2>Quiz Completed!!</h2>
      </div>
    );
  }

  // Shuffle answers only when the question changes
  const shuffledAnswers = useMemo(() => {
    const answers = [...QUESTIONS[activeQuestionIndex].answers];
    return answers.sort(() => Math.random() - 0.5);
  }, [activeQuestionIndex]);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

