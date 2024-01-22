import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useGameContext } from "../contexts/GameContext";

export const SquareGrid: React.FC = () => {
  const [cellSize, setCellSize] = useState<number | undefined>(undefined);
  const { gameModes, selectedMode, setSelectedCells } = useGameContext();
  const currentMode = gameModes.find((mode) => mode.id === selectedMode);
  const gridSize = currentMode?.field || 0;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    const containerWidth = containerRef.current?.clientWidth;

    if (containerWidth !== undefined) {
      setCellSize(containerWidth / gridSize);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);
  
 

  const createSequence = (n: number) => {
    return Array.from(Array(n).keys()).map((index) => index + 1);
  };

  const amountOfCells = createSequence(gridSize);

  const handleCellHover = (
    event: React.MouseEvent<HTMLDivElement>,
    cell: string
  ) => {
    setSelectedCells((prevSelectedCells) => [...prevSelectedCells, cell]);

    const element = event.currentTarget;

    if (element.classList.contains("bg-primary")) {
      element.classList.remove("bg-primary");
    } else {
      element.classList.add("bg-primary");
    }
  };

  return (
    <Container
      ref={containerRef}
      className="w-100 mt-3 border border-secondary"
    >
      {amountOfCells.map((item) => (
        <Row key={item} style={{ flexWrap: "nowrap" }}>
          {amountOfCells.map((element) => (
            <Col
              key={`${item}-${element}`}
              className="border border-secondary p-0"
              style={{ width: cellSize, height: cellSize }}
              onMouseEnter={(event) =>
                handleCellHover(
                  event as React.MouseEvent<HTMLDivElement>,
                  `row ${item} col ${element}`
                )
              }
            />
          ))}
        </Row>
      ))}
    </Container>
  );
};
