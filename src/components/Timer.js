import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import { setInterval, clearInterval } from "timers";

const styles = StyleSheet.create({
  time: {
    color: "white",
    fontSize: 160,
    margin: 0
  }
});

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.workDuration
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.getFormattedTime = this.getFormattedTime.bind(this);
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

    this.stop();

    if (active) {
      if (working) {
        // Start working in work duration
        this.reset(workDuration);
        this.start(workDuration, onWorkEnd);
      } else {
        // Start break in break duration
        this.reset(breakDuration);
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
          return { seconds: prevState.seconds - 1 };
        },
        () => {
          const { seconds } = this.state;

          if (seconds < 0) {
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
   * @param {number} duration
   * @memberof Timer
   */
  reset(duration) {
    this.setState({ seconds: duration });
  }

  /**
   * Get formatted seconds into time
   *
   * @returns {string}
   * @memberof Timer
   */
  getFormattedTime() {
    let { seconds } = this.state;
    let minutes = parseInt(seconds / 60);

    seconds %= 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  }

  render() {
    const { style } = this.props;

    return (
      <p className={css(styles.time)} style={style}>
        {this.getFormattedTime()}
      </p>
    );
  }
}

Timer.propTypes = {
  style: PropTypes.object,
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
