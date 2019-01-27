import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Card, Button, Header } from "semantic-ui-react";
import { GamesStore } from "../store/GamesStore";
import { GameType } from "../components/DayContext";
import TrashIcon from "../components/TrashIcon";

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

const NewGameCard: React.FunctionComponent<{ newIndex: number }> = ({
  newIndex
}) => (
  <Card
    description="Démarrer nouvelle partie"
    extra={
      <Link to={`/game/${newIndex}`}>
        <Button color="violet">Nouvelle partie</Button>
      </Link>
    }
  />
);

function handleTrashAll(gameStore: GamesStore) {
  if (window.confirm("Voulez-vous supprimer toutes les parties ?")) {
    gameStore.trashAllGames();
  }
}

const Home: React.FunctionComponent<{ gamesStore: GamesStore }> = ({
  gamesStore
}) => (
  <>
    <Button
      as="div"
      color="violet"
      role="button"
      aria-label="clear all games"
      tabIndex={0}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        borderRadius: "2rem",
        margin: 0,
        maxWidth: "56px",
        maxHeight: "56px"
      }}
      onClick={() => handleTrashAll(gamesStore)}
    >
      <TrashIcon />
    </Button>
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
  </>
);

export default inject("gamesStore")(observer(Home));
