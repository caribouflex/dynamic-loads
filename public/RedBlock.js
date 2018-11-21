class RedBlock extends React.Component {
  render() {
    return React.createElement(
      "div",
      {
        style: {
          color: "blue",
          backgroundColor: "red",
          width: "200px",
          height: "200px"
        }
      },
      "I'm a big block."
    );
  }
}

window.RedBlock = RedBlock;
