import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import { GamesStore } from "../store/GamesStore";

const Home: React.FunctionComponent<{ gamesStore: GamesStore }> = ({
  gamesStore
}) => (
  <>
    <h2>Games</h2>
    {gamesStore.games &&
      gamesStore.games.map((g, index) => (
        <div key={index}>
          <h4>{g.pickedValues.join(", ")}</h4>
          <Link to={`/game/${index}`}>
            <Button variant="outlined">&gt;</Button>
          </Link>
        </div>
      ))}
    <Link to={`/game/${gamesStore.games.length}`}>
      <Button variant="outlined">new game</Button>
    </Link>
  </>
);

export default inject("gamesStore")(observer(Home));
