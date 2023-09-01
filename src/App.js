import React, { useState, useEffect } from 'react';
import './App.css';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal', 'brown', 'gray'];
const maxAttempts = 3;

function App() {
  const [selectedColor, setSelectedColor] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [showWinMessage, setShowWinMessage] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  function displayColors() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(randomColor);
  }

  function checkGuess(guess) {
    if (guess === selectedColor) {
      showWinPopup();
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft - 1 <= 0) {
        alert(`Game Over! You are out of attempts. The correct color was ${selectedColor}.`);
        resetGame();
      }
    }
  }

  function showWinPopup() {
    setShowWinMessage(true);
    setTimeout(() => {
      setShowWinMessage(false);
      resetGame();
    }, 2000); 
  }

  function resetGame() {
    setAttemptsLeft(maxAttempts);
    displayColors();
  }

  return (
    <div className="App">
      <div className="top-info">
        <div className="center-top-title">Color Guessing Game</div>
        <p>Attempts left: {attemptsLeft}</p>
      </div>
      <div className="game-container">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-box ${color}`}
            style={{ backgroundColor: color }}
            onClick={() => checkGuess(color)}
          >
            {color}
            {attemptsLeft > 0 && (
              <img
                
                onClick={(e) => {
                  e.stopPropagation();
                  setAttemptsLeft(attemptsLeft - 1);
                }}
              />
            )}
          </button>
        ))}
      </div>
      {showWinMessage && <div className="popup">SUIIIIIII!!</div>}
    </div>
  );
}

export default App;
