import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import Timer from "./components/Timer";
import Button from "./components/Button";
import Stat from "./components/Stat";
import SideBar from "./components/SideBar";
import TextBox from "./components/TextBox";

import audioAlarm from "./assets/alarm.mp3";

const styles = StyleSheet.create({
  mainWorking: {
    backgroundColor: "#b51e1e",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative"
  },
  mainBreaking: {
    backgroundColor: "#4caa19",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative"
  },
  buttonContainer: {
    width: 160,
    margin: "auto",
    marginTop: 64
  },
  apply: {
    width: 96,
    fontSize: 14,
    padding: 8
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTimerActive: false,
      isWorking: false,
      totalBlock: 0,
      workingTimeConfig: 10,
      breakingTimeConfig: 10,
      workingTime: 10,
      breakingTime: 10
    };

    this.alarm = new Audio(audioAlarm);
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
    const {
      isTimerActive,
      isWorking,
      totalBlock,
      workingTimeConfig,
      breakingTimeConfig,
      workingTime,
      breakingTime
    } = this.state;

    return (
      <div
        className={css(isWorking ? styles.mainWorking : styles.mainBreaking)}
      >
        <SideBar>
          <TextBox
            label="Working Time"
            value={workingTimeConfig}
            onChange={e => this.setState({ workingTimeConfig: e.target.value })}
          />
          <TextBox
            label="Breaking Time"
            value={breakingTimeConfig}
            onChange={e =>
              this.setState({ breakingTimeConfig: e.target.value })
            }
          />
          <Button
            caption="Apply"
            style={styles.apply}
            onClick={() => {
              this.setState({
                workingTime: workingTimeConfig,
                breakingTime: breakingTimeConfig,
                isTimerActive: false,
                isWorking: false
              });
            }}
          />
        </SideBar>
        <Timer
          workDuration={workingTime}
          breakDuration={breakingTime}
          style={{ textAlign: "center", paddingTop: 128 }}
          active={isTimerActive}
          working={isWorking}
          onWorkEnd={() => {
            this.setState({ isWorking: false }, () => {
              this.notify("It's Working Time !");
              this.alarm.play();
            });
          }}
          onBreakEnd={() => {
            this.setState(
              prevState => ({
                isWorking: true,
                blocks: prevState.blocks + 1
              }),
              () => {
                this.setState(prevState => ({
                  totalBlock: prevState.totalBlock + 1
                }));
                this.notify("It's Breaking Time !");
                this.alarm.play();
              }
            );
          }}
        />
        <Stat
          total={totalBlock}
          name="Completed Task"
          style={{ position: "absolute", bottom: 32, left: 32 }}
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
                  this.setState(prevState => ({
                    isTimerActive: true,
                    isWorking: true,
                    totalBlock: prevState.totalBlock + 1
                  }));
                }}
              />
            )}
        </div>
      </div>
    );
  }
}

export default App;
