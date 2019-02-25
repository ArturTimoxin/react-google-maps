import React, { Component } from "react";
import { Map } from "./Map";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Map isMarkerShown />
        </div>
      </div>
    );
  }
}

export default App;
