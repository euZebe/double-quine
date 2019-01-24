import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Card, Button } from "semantic-ui-react";
import { GamesStore } from "../store/GamesStore";
import { GameType } from "../components/DayContext";

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
      description={game.pickedValues.join(", ")}
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

const NewGameCard: React.FunctionComponent<{ newIndex: number }> = ({
  newIndex
}) => (
  <Card
    description="Démarrer nouvelle partie"
    extra={
      <Link to={`/game/${newIndex}`}>
        <Button color="violet">Jouer</Button>
      </Link>
    }
  />
);

const Home: React.FunctionComponent<{ gamesStore: GamesStore }> = ({
  gamesStore
}) => (
  <Card.Group>
    {gamesStore.games &&
      [
        ...gamesStore.games.map((game, index) => (
          <GameCard key={index} game={game} index={index} />
        )),
        <NewGameCard
          newIndex={gamesStore.games.length}
          key={gamesStore.games.length}
        />
      ].reverse()}
  </Card.Group>
);

export default inject("gamesStore")(observer(Home));
