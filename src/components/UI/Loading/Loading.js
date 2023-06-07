import React from "react";
import classes from "./Loading.module.css";

const Loading = (props) => {
  return (
    <div className={classes.load}>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
