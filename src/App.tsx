import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DevTools from "mobx-react-devtools";
import GamePage from "./pages/GamePage";
import { observer, Provider } from "mobx-react";
import Home from "./pages/Home";
import { GamesStore } from "./store/GamesStore";

interface Props {
  store: GamesStore;
}

@observer
class App extends React.Component<Props> {
  render() {
    return (
      <Provider gamesStore={this.props.store}>
        <Router>
          <div>
            <DevTools />
            <Route path="/" exact component={Home} />
            <Route path="/game/:id" component={GamePage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
