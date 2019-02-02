import React from "react";
import { inject, observer } from "mobx-react";
import { Card, Button, Header } from "semantic-ui-react";
import { GamesStore } from "../store/GamesStore";
import GameCard from "../components/GameCard";
import NewGameCard from "../components/NewGameCard";
import styled from "styled-components";
import { Link } from "react-router-dom";

function handleTrashAll(gameStore: GamesStore) {
  if (window.confirm("Voulez-vous supprimer toutes les parties ?")) {
    gameStore.trashAllGames();
  }
}

const RightPanel = styled.div`
  float: right;
`;

const Home: React.FunctionComponent<{ gamesStore: GamesStore }> = ({
  gamesStore
}) => (
  <>
    <Header as="div">
      Double-quine
      <RightPanel>
        <Link to="/stats">
          <Button basic color="violet">
            statistiques
          </Button>
        </Link>
        <Button
          color="red"
          basic
          aria-label="clear all games"
          tabIndex={0}
          onClick={() => handleTrashAll(gamesStore)}
        >
          tout supprimer
        </Button>
      </RightPanel>
    </Header>
    <Card.Group className="fullWidth">
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
