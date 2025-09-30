import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import ScorePanel from './components/ScorePanel';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return squares.every(square => square) ? 'Draw' : null;
};

const getComputerMove = (squares) => {
  // Simple AI: Find first empty square
  const emptySquares = squares
    .map((square, index) => ({ square, index }))
    .filter(({ square }) => !square)
    .map(({ index }) => index);
  
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMode, setGameMode] = useState('player'); // 'player' or 'computer'
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (gameMode === 'computer' && currentPlayer === 'O' && !gameEnded) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(squares);
        handleMove(computerMove);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameEnded]);

  const handleMove = (index) => {
    if (squares[index] || gameEnded) return;

    const newSquares = squares.slice();
    newSquares[index] = currentPlayer;
    setSquares(newSquares);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setGameEnded(true);
      if (winner !== 'Draw') {
        setScores(prev => ({
          ...prev,
          [winner]: prev[winner] + 1
        }));
      }
    } else {
      setCurrentPlayer(current => current === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameEnded(false);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const toggleGameMode = () => {
    setGameMode(current => current === 'player' ? 'computer' : 'player');
    resetGame();
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? winner === 'Draw'
      ? "It's a Draw!"
      : `Winner: ${winner}`
    : `Next player: ${currentPlayer}`;

  return (
    <div className="App">
      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        
        <ScorePanel
          scores={scores}
          currentPlayer={currentPlayer}
          gameMode={gameMode}
        />

        <div className="game-mode">
          <button
            className={`btn ${gameMode === 'player' ? 'secondary' : ''}`}
            onClick={toggleGameMode}
          >
            {gameMode === 'player' ? 'vs Player' : 'vs Computer'}
          </button>
        </div>

        <Board squares={squares} onClick={handleMove} />

        <div className="game-status">
          <h2>{status}</h2>
        </div>

        <div className="game-actions">
          <button className="btn" onClick={resetGame}>
            New Game
          </button>
          <button className="btn secondary" onClick={resetScores}>
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
