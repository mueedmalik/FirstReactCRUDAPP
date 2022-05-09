import React from "react";
import "./SubBlock.css";

function SubBlock(props) {
  const classes = "subBlock " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default SubBlock;
