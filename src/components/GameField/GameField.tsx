import React from 'react';
import { PickMode } from '../PickMode/PickMode';
import { StartButton } from '../StartButton';
import { useGameContext } from '../contexts/GameContext';
import { SquareGrid } from '../SquareGrid';

export const GameField: React.FC = () => {
  const { isStartGame, selectedMode } = useGameContext();
  
  return (
    <div className="w-100">
      <div className="w-100 d-flex justify-content-between">
        <PickMode />
        <StartButton />
      </div>
      {(isStartGame && selectedMode) && <SquareGrid />}
    </div>
  );
};