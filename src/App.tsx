import { useEffect, useState } from "react"

import { Line } from "./components/Line.component"

import { WORD_LENGTH } from "./constants"

const solution = 'HELLO';

export function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;

      if (e.key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) return;

        const newGuesses = [...guesses]
        newGuesses[guesses.findIndex(val => val == null)] = currentGuess
        setGuesses(newGuesses)
        setCurrentGuess("")

        const isCorrect = solution === currentGuess;
        setIsGameOver(isCorrect);
        return
      }

      if (e.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1))
        return
      }

      if (currentGuess.length >= WORD_LENGTH) return
      

      setCurrentGuess(currentGuess + e.key.toUpperCase())
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentGuess, isGameOver, guesses])

  return (
    <div className="flex flex-col justify-center gap-1">
      {guesses.map((line, index) => {
        const isCurrent = index === guesses.findIndex(val => val == null)
      
        return ( 
          <Line 
            key={index} 
            line={isCurrent ? currentGuess : line ?? ""} 
            isFinal={!isCurrent && line != null} 
            solution={solution} 
          />
        )
      })}

      {currentGuess}
    </div>
  )
}
