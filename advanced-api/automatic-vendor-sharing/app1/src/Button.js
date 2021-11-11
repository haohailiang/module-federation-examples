import React from "react";
const REACT_VERSION = React.version;

const style = {
  background: "#800",
  color: "#fff",
  padding: 12,
};

const Button = () => <button style={style}>App 1 Button - {REACT_VERSION}</button>;

export default Button;
