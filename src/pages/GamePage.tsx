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
  state = { isStarted: false };

  @action
  componentDidMount() {
    const { gamesStore } = this.props;
    gamesStore.currentGameIndex = this.getIDAsNumber();
    if (this.getIDAsNumber() >= gamesStore.games.length) {
      gamesStore.initiateNewGame();
    }
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
    this.setState({ isStarted: true });
  };

  @action
  handleDuration = (value: number) => {
    const { gamesStore } = this.props;
    gamesStore.setDuration(this.getIDAsNumber(), value);
  };

  render() {
    const { gamesStore } = this.props;
    const { games } = gamesStore;
    if (this.getIDAsNumber() >= games.length) return "";
    const game = games[this.getIDAsNumber()];
    const { isStarted } = this.state;
    return (
      <GameComponent
        game={game}
        isStarted={isStarted}
        handleValuePicked={this.toggleValue}
        setDuration={this.handleDuration}
      />
    );
  }
}
export default GamePage;
