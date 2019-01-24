import * as React from "react";
import { RouteComponentProps } from "react-router";
import GameComponent from "./GameComponent";
import { inject, observer } from "mobx-react";
import { GamesStore } from "../store/GamesStore";
import { action } from "mobx";

export interface GameParams {
  id: string;
}

export interface OwnProps {
  gamesStore: GamesStore;
}

@inject("gamesStore")
@observer
class GamePage extends React.Component<
  RouteComponentProps<GameParams> & OwnProps
> {

  @action
  componentDidMount() {
    this.props.gamesStore.currentGameIndex = this.getIDAsNumber();
  }

  getID(): string {
    return this.props.match.params.id;
  }
  getIDAsNumber(): number {
    return Number.parseInt(this.getID());
  }

  @action
  toggleValue = (value: number) => {
    const { gamesStore } = this.props;
    gamesStore.toggleValue(this.getIDAsNumber(), value);
  };

  render() {
    const { games } = this.props.gamesStore;
    const game = games[this.getIDAsNumber()];
    return (
      <GameComponent
        game={game}
        handleValuePicked={this.toggleValue}
      />
    );
  }
}
export default GamePage;
