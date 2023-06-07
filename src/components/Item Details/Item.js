import React from "react";
import classes from "./Item.module.css";
import Button from "../UI/Button/Button";

const Item = (props) => {
  return (
    <div className={classes.item}>
      {props.img && <img src={props.img} />}
      <h2>Product: {props.title}</h2>
      <h2>Price: {props.price}</h2>
      <br />
      <Button className={classes.button}>
        <a href={props.site} target="_blank">
          Go to Website
        </a>
      </Button>
    </div>
  );
};

export default Item;
