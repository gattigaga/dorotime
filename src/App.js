import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import Timer from "./components/Timer";
import Button from "./components/Button";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#b51e1e",
    height: "100vh"
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTimerActive: false,
      isWorking: false,
      blocks: 0
    };
  }

  render() {
    const { isTimerActive, isWorking } = this.state;

    return (
      <div className={css(styles.main)}>
        <Timer
          active={isTimerActive}
          working={isWorking}
          onWorkEnd={() => {
            this.setState({ isWorking: false });
          }}
          onBreakEnd={() => {
            this.setState(prevState => ({
              isWorking: true,
              blocks: prevState.blocks + 1
            }));
          }}
        />
        {!isTimerActive && (
          <Button
            caption="Start"
            onClick={() => {
              this.setState({
                isTimerActive: true,
                isWorking: true
              });
            }}
          />
        )}
        {isTimerActive &&
          isWorking && (
            <Button
              caption="Stop"
              onClick={() => {
                this.setState({
                  isTimerActive: false,
                  isWorking: false
                });
              }}
            />
          )}
        {isTimerActive &&
          !isWorking && (
            <Button
              caption="Skip Break"
              onClick={() => {
                this.setState({
                  isTimerActive: true,
                  isWorking: true
                });
              }}
            />
          )}
      </div>
    );
  }
}

export default App;
