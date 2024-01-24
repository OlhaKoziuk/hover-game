import React, { createContext, useContext, useEffect, useState } from "react";
import { Mode } from "../../types/Mode";
import { getGameModes } from "../../apiService";

interface GameContextProps {
  gameModes: Mode[];
  isStartGame: boolean;
  selectedMode: string | null;
  selectedCells: string[];
  setGameModes: React.Dispatch<React.SetStateAction<Mode[]>>;
  setIsStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedCells: React.Dispatch<React.SetStateAction<string[]>>;
};

const GameContext = createContext<GameContextProps | null>(null);

type Props = {
  children: React.ReactNode,
}

export const GameProvider: React.FC<Props> = ({ children }) => {
  const [gameModes, setGameModes] = useState<Mode[]>([]);
  const [isStartGame, setIsStartGame] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameModes();
        setGameModes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameModes,
        setGameModes,
        isStartGame,
        setIsStartGame,
        selectedMode,
        setSelectedMode,
        selectedCells,
        setSelectedCells,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
};