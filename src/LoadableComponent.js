import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const create = callback => {
  let scriptTag = document.createElement("script");
  scriptTag.setAttribute("src", "/Bordeaux.js");
  scriptTag.onload = callback;
  document.body.appendChild(scriptTag);
};

export default class LoadableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      Component: undefined
    };
    create(this.cb);
  }

  cb = e => {
    // scriptToRemove.removeChild(scriptToRemove);
    console.log("LOAAAAADED");
    console.log(window);
    this.setState({
      ready: true,
      Component: window.Bordeaux
    });
  };

  render() {
    return (
      <ErrorBoundary>
        {this.state.ready ? <this.state.Component /> : <div>WAIT...</div>}
      </ErrorBoundary>
    );
  }
}
