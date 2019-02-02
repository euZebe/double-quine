import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import { observer, Provider } from "mobx-react";
import Home from "./pages/Home";
import { GamesStore } from "./store/GamesStore";
import Statistics from "./pages/Statistics";

interface Props {
  store: GamesStore;
}

@observer
class App extends React.Component<Props> {
  render() {
    return (
      <>
        <Provider gamesStore={this.props.store}>
          <Router basename={process.env.PUBLIC_URL}>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/game/:id" component={GamePage} />
              <Route path="/stats" component={Statistics} />
            </div>
          </Router>
        </Provider>
      </>
    );
  }
}

export default App;
