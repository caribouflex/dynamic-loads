import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const create = (callback, file) => {
  let scriptTag = document.createElement("script");
  scriptTag.setAttribute("src", file);
  scriptTag.onload = callback;
  document.body.appendChild(scriptTag);
};

export default class LoadableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.file,
      componentName: this.props.componentName,
      ready: false,
      Component: undefined
    };
    create(this.cb, this.state.file);
  }

  cb = e => {
    console.log("LOAAAAADED");
    this.setState({
      ready: true,
      Component: window[this.state.componentName]
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
