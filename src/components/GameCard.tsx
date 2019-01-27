import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import { GameType } from "./DayContext";

interface GameCardProps {
  game: GameType;
  index: number;
}

const GameCard: React.FunctionComponent<GameCardProps> = ({ game, index }) => {
  return (
    <Card
      header={`Partie ${index + 1}`}
      meta={`${game.pickedValues.length} tirage${
        game.pickedValues.length > 1 ? "s" : ""
        }`}
      description={
        <span data-testid="game-card">{game.pickedValues.join(", ")}</span>
      }
      extra={
        <Link to={`/game/${index}`}>
          <Button basic color="violet">
            Continuer
          </Button>
        </Link>
      }
    />
  );
};

export default GameCard;