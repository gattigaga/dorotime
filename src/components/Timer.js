import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import { setInterval, clearInterval } from "timers";

const styles = StyleSheet.create({
  time: {
    color: "white",
    fontSize: 128,
    margin: 0
  }
});

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      active,
      working,
      workDuration,
      breakDuration,
      onWorkEnd,
      onBreakEnd
    } = nextProps;

    // Stop and reset seconds to zero
    this.stop();
    this.reset();

    if (active) {
      if (working) {
        // Start working in work duration
        this.start(workDuration, onWorkEnd);
      } else {
        // Start break in break duration
        this.start(breakDuration, onBreakEnd);
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  /**
   * Start the timer
   *
   * @param {number} duration
   * @param {function} callback
   * @memberof Timer
   */
  start(duration, callback) {
    this.timer = setInterval(() => {
      this.setState(
        prevState => {
          return { seconds: prevState.seconds + 1 };
        },
        () => {
          const { seconds } = this.state;

          if (seconds > duration) {
            callback();
          }
        }
      );
    }, 1000);
  }

  /**
   * Stop the timer
   *
   * @memberof Timer
   */
  stop() {
    clearInterval(this.timer);
  }

  /**
   * Reset the timer
   *
   * @memberof Timer
   */
  reset() {
    this.setState({ seconds: 0 });
  }

  render() {
    const { seconds } = this.state;

    return <p className={css(styles.time)}>{seconds}</p>;
  }
}

Timer.propTypes = {
  active: PropTypes.bool,
  working: PropTypes.bool,
  workDuration: PropTypes.number,
  breakDuration: PropTypes.number,
  onWorkEnd: PropTypes.func,
  onBreakEnd: PropTypes.func
};

Timer.defaultProps = {
  workDuration: 10,
  breakDuration: 10
};

export default Timer;
