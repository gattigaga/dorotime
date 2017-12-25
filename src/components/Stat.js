import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  total: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto",
    margin: 0,
    fontWeight: "bold"
  },
  name: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto",
    marginTop: 8,
    marginBottom: 0,
    opacity: 0.5
  }
});

function Stat({ style, total, name }) {
  return (
    <div style={style}>
      <p className={css(styles.total)}>{total}</p>
      <p className={css(styles.name)}>{name}</p>
    </div>
  );
}

Stat.propTypes = {
  style: PropTypes.object,
  total: PropTypes.number,
  name: PropTypes.string.isRequired
};

Stat.defaultProps = {
  total: 0
};

export default Stat;
