import React, { useState } from "react";
import classes from "./Body.module.css";
import Card from "../UI/Card/Card";
import Search from "../Search/Search";
import Item from "../Item Details/Item";
import Loading from "../UI/Loading/Loading";

const Body = () => {
  var dataA = {
    amazon: {
      item1: {
        title: "",
        img: "",
        price: "",
        site: "",
      },
    },
  };

  var dataF = {
    flipkart: {
      item1: {
        title: "",
        img: "",
        price: "",
        site: "",
      },
    },
  };

  const [data, setData] = useState({ ...dataA, ...dataF });
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = async (item) => {
    if (item === "") {
      return null;
    }

    const temp = { Title: item };
    setIsLoading(true);
    const response = await fetch(
      "https://exuberant-ray-overalls.cyclic.app/testAPI",
      // "http://localhost:3001/testAPI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(temp),
      }
    );

    const res = await response.json();
    if (res) {
      setIsLoading(false);
    }
    setData(res.data);
  };

  return (
    <div className={classes.gap}>
      <Search getItem={searchHandler} />
      <div className={classes.cards}>
        <Card className={classes.bottom_padding}>
          <div className={`${classes.logo} ${classes.margin}`}>
            <img
              alt="Amazon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
            />
          </div>
          <br />
          {isLoading && <Loading />}
          {!isLoading && (
            <Item
              img={data.amazon.item1.img}
              title={data.amazon.item1.title}
              price={data.amazon.item1.price}
              site={data.amazon.item1.site}
            />
          )}
        </Card>
        <Card className={classes.bottom_padding}>
          <div className={classes.logo}>
            <img
              alt="Flipkart"
              src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png"
            />
          </div>
          {isLoading && <Loading />}
          {!isLoading && (
            <Item
              img={data.flipkart.item1.img}
              title={data.flipkart.item1.title}
              price={data.flipkart.item1.price}
              site={data.flipkart.item1.site}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Body;
