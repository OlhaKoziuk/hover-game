import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useGameContext } from "../contexts/GameContext";

export const SquareGrid: React.FC = () => {
  const [cellSize, setCellSize] = useState<number>(0);
  const { gameModes, selectedMode, setSelectedCells } = useGameContext();
  const currentMode = gameModes.find((mode) => mode.id === selectedMode);
  const gridSize = currentMode?.field || 0;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.height = "85vh";
        const containerHeight = containerRef.current.clientHeight;
        const containerWidth = containerRef.current.clientWidth;

        if (
          containerHeight &&
          containerWidth &&
          containerHeight > containerWidth
        ) {
          setCellSize(containerWidth / gridSize);
        } else if (containerHeight) {
          setCellSize(containerHeight / gridSize);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gridSize, containerRef]);
  
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
    <Container ref={containerRef} className="mt-3">
      {amountOfCells.map((item) => (
        <Row key={item} className="flex-nowrap justify-content-center">
          {amountOfCells.map((element) => (
            <Col
              key={`${item}-${element}`}
              className="border border-secondary p-0"
              style={{ maxWidth: cellSize, height: cellSize }}
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
