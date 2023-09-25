import React from "react";
import classes from "./List.module.css";
import ListItems from "./ListItems";

const objConvert = (obj) => {
  var temp = [];
  var count = 1;
  while (count <= obj.length) {
    temp.push(obj[`item${count}`].title);
    console.log(obj[`item${count}`].title);
    count += 1;
  }
  return temp;
};

const List = (props) => {
  var Array = objConvert(props.obj);

  const items = (
    <ul style={{ listStyleType: "none" }}>
      {Array.map((item) => (
        <ListItems title={item} />
      ))}
    </ul>
  );

  return <div>{items}</div>;
};

export default List;
