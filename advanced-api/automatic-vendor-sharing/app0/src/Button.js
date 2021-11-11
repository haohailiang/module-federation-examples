import React from "react";
const REACT_VERSION = React.version;

const style = {
  background: "#f00",
  color: "#fff",
  padding: 12,
};

const Button = () => <button style={style}>App 0 Button - {REACT_VERSION}</button>;

export default Button;
