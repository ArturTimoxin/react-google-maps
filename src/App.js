import React, { Component } from "react";
// import { Map } from "./Map"; <Map isMarkerShown />
import MapWrapper from "./MapWrapper";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <MapWrapper />
        </div>
      </div>
    );
  }
}

export default App;
