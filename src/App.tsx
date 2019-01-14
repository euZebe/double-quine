import React, { Component } from 'react';
import NumbersBoard from "./components/NumbersBoard/NumbersBoard";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NumbersBoard pickedValues={[1, 68, 89]} />
      </div>
    );
  }
}

export default App;
