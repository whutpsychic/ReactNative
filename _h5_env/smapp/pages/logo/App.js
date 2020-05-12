import React from "react";
import "./index.css";
import "./App.css";

import logo from "./logo.png";

class App extends React.Component {
  render() {
    return (
      <div className="app-container logo">
        <img alt="logo" src={logo} />
      </div>
    );
  }
}

export default App;
