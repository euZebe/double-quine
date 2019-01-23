import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import DayContext, { GameType, IDayContext } from "./components/DayContext";
import Home from "./pages/Home";

class App extends React.Component<{}, IDayContext> {
  constructor(props: {}) {
    super(props);
    this.state = {
      games: this.getItemsFromStorage(),
      toggleValue: this.handleToggle
    };
  }

  getItemsFromStorage(): GameType[] {
    const values: string[] = Object.values(window.localStorage);
    return values.map(element => JSON.parse(element)) as GameType[];
  }

  handleToggle = (gameID: number, value: number) => {
    // update currentGame state
    // persist game
    const { games } = this.state;
    const { pickedValues } = this.state.games[gameID];
    const indexOfValue = pickedValues.indexOf(value);
    if (pickedValues.length && indexOfValue === pickedValues.length - 1) {
      // remove last
      const updatedGame = {
        pickedValues: pickedValues.slice(0, pickedValues.length - 1)
      };
      const newState = {
        games: [
          ...games.slice(0, gameID),
          updatedGame,
          ...games.slice(gameID + 1)
        ]
      };
      this.setState(newState);
      this.persistGame(gameID.toString(), updatedGame);
    } else if (indexOfValue === -1) {
      // if value exists in the array but not at the last place, don't add it
      const updatedGame = { pickedValues: [...pickedValues, value] };
      const newState = {
        games: [
          ...games.slice(0, gameID),
          updatedGame,
          ...games.slice(gameID + 1)
        ]
      };
      this.setState(newState);
      this.persistGame(gameID.toString(), updatedGame);
    }
  };

  persistGame = (id: string, game: GameType) => {
    const { pickedValues } = game;
    localStorage.setItem(id, JSON.stringify({ pickedValues }));
  };

  render() {
    return (
      <DayContext.Provider value={this.state}>
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/game/:id" component={GamePage} />
          </div>
        </Router>
      </DayContext.Provider>
    );
  }
}

export default App;
