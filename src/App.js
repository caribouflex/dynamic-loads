import React, { Component } from "react";
import Home from "./Home";
import About from "./About";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoadableContact } from "./LoadableContact";
import "./App.css";
import LoadableComponent from "./LoadableComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header style={{ backgroundColor: "lightblue", height: "80px" }}>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <LoadableComponent />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={LoadableContact} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
