import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import "./components/stylesheets/main.css";
import "./components/stylesheets/custom.css";

import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Main} />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
