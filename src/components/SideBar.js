import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import $ from "jquery";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: 240,
    background: "#333",
    position: "absolute",
    right: 0,
    padding: 24,
    boxSizing: "border-box"
  },
  header: {
    color: "white",
    fontFamily: "Roboto",
    marginTop: 0
  }
});

function SideBar({ children }) {
  return (
    <div className={css(styles.container)}>
      <h3 className={css(styles.header)}>Menu</h3>
      {children}
    </div>
  );
}

SideBar.propTypes = {
  children: PropTypes.node
};

export default SideBar;
