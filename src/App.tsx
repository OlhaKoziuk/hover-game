import React from 'react';
import './App.css';
import { GameField } from './components/GameField';
import { HoverSquares } from './components/HoverSquares';


function App() {
  return (
    <div className="appContainer">
      <div className="gameField">
        <GameField />
      </div>
      <div className="hoverSquares">
        <HoverSquares />
      </div>
    </div>
  );
};

export default App;
