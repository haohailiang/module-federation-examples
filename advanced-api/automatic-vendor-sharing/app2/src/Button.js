import React from "react";
const REACT_VERSION = React.version;

const style = {
  background: "#00c",
  color: "#fff",
  padding: 12,
};

const Button = () => <button style={style}>App 2 Button - {REACT_VERSION}</button>;

export default Button;
