import React from 'react';
import { Dropdown } from "react-bootstrap";
import { useGameContext } from '../contexts/GameContext';

export const PickMode: React.FC = () => {
  const {
    gameModes,
    setIsStartGame,
    selectedMode,
    setSelectedMode,
    setSelectedCells,
  } = useGameContext();

const handleModeSelect = (modeId: string | null) => {
  setSelectedMode(modeId);
  setIsStartGame(false);
  setSelectedCells([]);
};
  
  return (
    <div className="w-75">
      <Dropdown
        onSelect={(modeId: string | null) => handleModeSelect(modeId)}
        className="mr-3"
      >
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="bg-body text-dark border border-secondary 
          w-100 d-flex justify-content-between align-items-center"
        >
          {selectedMode
            ? gameModes.find((mode) => mode.id === selectedMode)?.name
            : "Pick mode"}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100">
          {gameModes.map((mode) => (
            <Dropdown.Item
              key={mode.id}
              eventKey={mode.id}
              disabled={
                window.innerWidth < 500 &&
                (mode.name === "name 5" || mode.name === "name 6")
              }
            >
              {mode.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};