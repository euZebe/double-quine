import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import { GameType } from "./DayContext";
import { observer } from "mobx-react";

interface GameCardProps {
  game: GameType;
  index: number;
}

function getDurationInMinutes(duration?: number) {
  if (!duration) return "";
  const minutes = Math.floor(duration / 60);
  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
}

function getDrawsToString(nbDraws: number) {
  return `${nbDraws} tirage${nbDraws > 1 ? "s" : ""}`;
}

const GameCard: React.FunctionComponent<GameCardProps> = ({ game, index }) => {
  return (
    <Card
      header={`Partie ${index + 1}`}
      meta={getDrawsToString(game.pickedValues.length) + " - " + getDurationInMinutes(game.duration)}
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

export default observer(GameCard);
