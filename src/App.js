import React, { Component } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoadableContact } from "./loadable/LoadableContact";
import "./App.css";
import LoadableComponent from "./loadable/LoadableComponent";
import FileUpload from "./FileUpload";

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
        <LoadableComponent componentName="LikeButton" file="/LikeButton.js" />
        <LoadableComponent componentName="RedBlock" file="/RedBlock.js" />
        <FileUpload />
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
