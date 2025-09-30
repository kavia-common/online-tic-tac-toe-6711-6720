import React from 'react';

const ScorePanel = ({ scores, currentPlayer, gameMode }) => (
  <div className="score-panel">
    <div>
      <h3>Player X: {scores.X}</h3>
      <p>Current Turn: {currentPlayer}</p>
    </div>
    <div>
      <h3>Player O: {scores.O}</h3>
      <p>Mode: {gameMode === 'computer' ? 'vs Computer' : 'vs Player'}</p>
    </div>
  </div>
);

export default ScorePanel;
