import React from 'react';
import { Container, ListGroup } from "react-bootstrap";
import { useGameContext } from '../contexts/GameContext';

export const HoverSquares: React.FC = () => {
  const { selectedCells } = useGameContext();

  return (
    <section>
      <h2 className="text-center">Hover squares</h2>
      <Container className="w-100">
        <ListGroup>
          {selectedCells.map((item) => (
            <ListGroup.Item
              key={Math.random()}
              className="text-warning-emphasis 
              bg-danger-subtle rounded mt-1 mb-1"
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
};
