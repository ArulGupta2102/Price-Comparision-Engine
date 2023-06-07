import React, { useState } from "react";
import classes from "./Search.module.css";
import Button from "../UI/Button/Button";

const Search = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.getItem(enteredValue);
  };

  return (
    <div className={classes.search}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search for a product..."
          className={classes.input}
          onChange={inputChangeHandler}
        />
        <Button className={classes.search_button} onClick={submitHandler}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
