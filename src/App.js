import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#b51e1e",
    height: "100vh"
  }
});

class App extends Component {
  render() {
    return <div className={css(styles.main)} />;
  }
}

export default App;
