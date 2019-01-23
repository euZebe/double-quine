import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DayContext from "../components/DayContext";

const Home: React.FunctionComponent<{}> = () => (
  <>
    <h2>Games</h2>
    <DayContext.Consumer>
      {({ games }) => (
        <>
          {games.map((g, index) => (
            <div key={index}>
              <h4>{g.pickedValues.join(", ")}</h4>
              <Link to={`/game/${index}`}>
                <Button variant="outlined">&gt;</Button>
              </Link>
            </div>
          ))}
          <Link to={`/game/${games.length}`}>
            <Button variant="outlined">new game</Button>
          </Link>
        </>
      )}
    </DayContext.Consumer>
  </>
);

export default Home;