import React from 'react'
import logo from "../assets/quiz-logo.png"

export default function Header() {
  return (
    <header>
        <img src=
         {logo} alt="logo" />

        <h1>
            ReactQuiz
        </h1>
        <h2>
          Welcome to react quiz
        </h2>
    </header>
  )
}
