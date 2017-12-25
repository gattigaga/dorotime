import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import Timer from "./components/Timer";
import Button from "./components/Button";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#b51e1e",
    height: "100vh"
  },
  buttonContainer: {
    width: 160,
    margin: "auto",
    marginTop: 64
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

    this.notify = this.notify.bind(this);
    this.requestPermission = this.requestPermission.bind(this);
  }

  componentDidMount() {
    this.requestPermission();
  }

  /**
   * Request notification permission
   *
   * @memberof App
   */
  requestPermission() {
    Notification.requestPermission();

    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  }

  /**
   * Create notification
   *
   * @param {string} message
   * @memberof App
   */
  notify(message) {
    if (Notification.permission === "granted") {
      const notification = new Notification(message);
    }
  }

  render() {
    const { isTimerActive, isWorking } = this.state;

    return (
      <div className={css(styles.main)}>
        <Timer
          style={{ textAlign: "center", paddingTop: 128 }}
          active={isTimerActive}
          working={isWorking}
          onWorkEnd={() => {
            this.setState({ isWorking: false }, () =>
              this.notify("It's Working Time !")
            );
          }}
          onBreakEnd={() => {
            this.setState(
              prevState => ({
                isWorking: true,
                blocks: prevState.blocks + 1
              }),
              () => this.notify("It's Breaking Time !")
            );
          }}
        />
        <div className={css(styles.buttonContainer)}>
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
      </div>
    );
  }
}

export default App;
