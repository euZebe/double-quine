import * as React from "react";
import DayContext, { GameType } from "../components/DayContext";
import { RouteComponentProps } from "react-router";
import GameComponent from "./GameComponent";

interface GameParams {
  id: string;
}

class GamePage extends React.Component<RouteComponentProps<GameParams>> {


  getIDAsNumber(): number {
    return Number.parseInt(this.getID());
  }

  getID(): string {
    return this.props.match.params.id;
  }

  render() {
    return (
      <DayContext.Consumer>
        {({ games, toggleValue }) => {
          const game = games[this.getIDAsNumber()] || this.state;
          return (
            <GameComponent game={game} handleValuePicked={(value) => {
              toggleValue(this.getIDAsNumber(), value);
            }} />
          );
        }}
      </DayContext.Consumer>
    );
  }
}
export default GamePage;
