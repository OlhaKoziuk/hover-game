import React from 'react';
import { Button } from "react-bootstrap";
import { useGameContext } from '../contexts/GameContext';

export const StartButton: React.FC = () => {
  const { setIsStartGame, selectedMode } = useGameContext();
 
  return (
    <Button
      variant="primary"
      style={{ width: "20%" }}
      onClick={() => setIsStartGame(true)}
      disabled={selectedMode === null}
    >
      Start
    </Button>
  );
};