import React from "react";
import { inject, observer } from "mobx-react";
import { Card, Button } from "semantic-ui-react";
import { GamesStore } from "../store/GamesStore";
import TrashIcon from "../components/TrashIcon";
import GameCard from "../components/GameCard";
import NewGameCard from "../components/NewGameCard";

function handleTrashAll(gameStore: GamesStore) {
  if (window.confirm("Voulez-vous supprimer toutes les parties ?")) {
    gameStore.trashAllGames();
  }
}

const clearAllStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  borderRadius: "2rem",
  margin: 0,
  maxWidth: "56px",
  maxHeight: "56px"
};

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
      style={clearAllStyle}
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
