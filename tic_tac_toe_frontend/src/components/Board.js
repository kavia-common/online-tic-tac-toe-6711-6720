import React from 'react';

const Board = ({ squares, onClick }) => (
  <div className="game-board">
    {squares.map((square, i) => (
      <button
        key={i}
        className={`cell ${square?.toLowerCase() || ''}`}
        onClick={() => onClick(i)}
        disabled={square}
        aria-label={`Cell ${i + 1}`}
      >
        {square}
      </button>
    ))}
  </div>
);

export default Board;
