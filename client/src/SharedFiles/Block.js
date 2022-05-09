import React from "react";
import "./Block.css";

function Block(props) {
  const classes = "block " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Block;
