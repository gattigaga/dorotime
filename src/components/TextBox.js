import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    color: "white",
    fontFamily: "Roboto"
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    border: 0,
    fontSize: 16,
    fontFamily: "Roboto",
    width: "100%",
    padding: 8,
    boxSizing: "border-box",
    marginTop: 8,
    borderRadius: 5,
    outlineWidth: 0
  }
});

function TextBox({ style, label, value, onChange }) {
  return (
    <div className={css(styles.container)}>
      <label className={css(styles.label)}>{label}</label>
      <input
        type="number"
        className={css(styles.input)}
        value={value}
        style={style}
        onChange={onChange}
      />
    </div>
  );
}

TextBox.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

TextBox.defaultProps = {
  label: "Label",
  value: 0
};

export default TextBox;
