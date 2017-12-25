import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c62b2b",
    color: "white",
    border: 0,
    fontSize: 24,
    width: 160,
    paddingTop: 16,
    paddingBottom: 16,
    transition: "all .3s",
    cursor: "pointer",
    outlineWidth: 0,
    ":hover": {
      backgroundColor: "#d33939"
    }
  }
});

function Button({ style, caption, onClick }) {
  return (
    <button className={css(styles.button)} style={style} onClick={onClick}>
      {caption}
    </button>
  );
}

Button.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
