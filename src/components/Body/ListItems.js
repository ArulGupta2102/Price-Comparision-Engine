import React from "react";
import classes from "./ListItems.module.css";

const ListItems = (props) => {
  console.log(props.title);
  return (
    <li>
      <div>
        <h2>{props.title}</h2>
      </div>
    </li>
  );
};

export default ListItems;
