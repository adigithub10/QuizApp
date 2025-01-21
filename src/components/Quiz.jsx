import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import OverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState(""); // Tracks if an answer is selected
  const [userAnswers, setUserAnswers] = useState([]); // Stores user answers
  const activeQuestionIndex = userAnswers.length; // Current question index
  const quizIsOver = activeQuestionIndex >= QUESTIONS.length; // Check if quiz is over
  const shuffledAnswers = useRef([]); // Cache for shuffled answers

  // Shuffle answers for the current question when needed
  if (!shuffledAnswers.current[activeQuestionIndex] && !quizIsOver) {
    shuffledAnswers.current[activeQuestionIndex] = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current[activeQuestionIndex].sort(() => Math.random() - 0.5);
  }

  
  const handleSelectAswer = useCallback(
    (selectedAns) => {
      setAnswerState("answered");

      setTimeout(() => {
        const isCorrect = selectedAns === QUESTIONS[activeQuestionIndex].answers[0];
        setAnswerState(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
          
        }, timeout);(() => {
          setAnswerState("");
          setUserAnswers((prevUserAns) => [...prevUserAns, selectedAns]);
        }, 2000); // Delay before moving to the next question
      }, 1000); // Delay for showing correctness state
    },
    [activeQuestionIndex]
  );

  // Handle skipping a question
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  // If the quiz is over, render the summary screen
  if (quizIsOver) {
    return (
      <div id="summary">
        <img src={OverImg} alt="Quiz Over" />
        <h2>Quiz Completed!!</h2>
      </div>
    );
  }

  // Render the current question and its answers
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current[activeQuestionIndex].map((answer) => {
            const isSelected =
              userAnswers[activeQuestionIndex] === answer; // Check if this answer is selected
            const isCorrect = answer === QUESTIONS[activeQuestionIndex].answers[0]; // Correctness check
            let cssClass = "";

            // Determine CSS class based on the current state
            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            } else if (answerState === "correct" && isSelected) {
              cssClass = "correct";
            } else if (answerState === "wrong" && isSelected) {
              cssClass = "wrong";
            }

            return (
              <li key={answer} className={`answer ${cssClass}`}>
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  disabled={answerState === "answered"} // Disable button if answered
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
