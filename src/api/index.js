console.log("Hello there!");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const router = express.Router();

const app = express();

const ads = [
  {
    title: "Hello World (again)!",
  },
];

//Using Helme(REST API's Security)
app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan("combined"));

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.send(ads);
});

app.listen(3000, () => {
  console.log("listening on port 3001");
});

app.post("/api", (req, res) => {
  console.log("Got a request");
  console.log(req.body);
});

var dataA = {
  amazon: {
    title: "",
    img: "",
    price: "",
    link: "",
  },
};

var dataF = {
  flipkart: {
    title: "",
    img: "",
    price: "",
    link: "",
  },
};

const getSearchUrlA = (query) =>
  `https://www.amazon.in/s?k=${query.replace(" ", "+")}&sprefix=${query.replace(
    " ",
    "+"
  )}`;

const getSearchUrlF = (query) =>
  `https://www.flipkart.com/search?q=${query.replace(" ", "+")}`;

async function amazonSearch(query) {
  const url = getSearchUrlA(query);
  const { data: html } = await axios.get(url, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      Host: "www.amazon.in",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      pragma: "no-cache",
      rtt: 150,
      "sec-ch-device-memory": 8,
      "sec-ch-dpr": 1.125,
      "sec-ch-ua": `"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111" `,
      "sec-ch-ua-mobile": `?0`,
      "sec-ch-ua-platform": "Windows",
      "sec-ch-ua-platform-version": "10.0.0",
      "sec-ch-viewport-width": 1707,
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same - origin",
      "sec-fetch-user": `?1`,
      "upgrade-insecure-requests": 1,
    },
  });
  const dom = new jsdom(html);
  const $ = (selector) => dom.window.document.querySelectorAll(selector);
  const firstElement = $('[data-component-type="s-search-result"]');
  const titleTemp =
    firstElement[0].querySelector(
      "span.a-size-medium.a-color-base.a-text-normal"
    ) ||
    firstElement[0].querySelector(
      "span.a-size-base-plus.a-color-base.a-text-normal"
    );
  dataA = {
    amazon: {
      title: titleTemp.innerHTML,
      img:
        firstElement[0].querySelector("img").src ||
        firstElement[0].querySelector("s-image").src,
      price: firstElement[0].querySelector("span.a-offscreen").innerHTML,
      link: `https://www.amazon.in${
        firstElement[0].querySelector("a.a-link-normal").href
      }`,
    },
  };
  return dataA;
}

async function flipkartSearch(query) {
  const url = getSearchUrlF(query);

  const { data: html } = await axios.get(url, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      Host: "www.flipkart.com",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      pragma: "no-cache",
      "sec-ch-device-memory": 8,
      "sec-ch-dpr": 1.125,
      "sec-ch-ua": `"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111" `,
      "sec-ch-ua-mobile": `?0`,
      "sec-ch-ua-platform": "Windows",
      "sec-ch-ua-platform-version": "10.0.0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": `?1`,
      "upgrade-insecure-requests": 1,
    },
  });

  const dom = new jsdom(html);
  const $ = (selector) => dom.window.document.querySelectorAll(selector);
  const firstElement = $('[class="_1AtVbE col-12-12"]');

  const titleTemp =
    firstElement[2].querySelector("a.s1Q9rs") ||
    firstElement[2].querySelector("div._4rR01T");
  const imgTemp =
    firstElement[1].querySelector("img._396cs4") ||
    firstElement[2].querySelector("img._396cs4");
  const priceTemp =
    firstElement[1].querySelector("div._30jeq3") ||
    firstElement[2].querySelector("div._30jeq3");
  const linkTemp =
    firstElement[1].querySelector("a._1fQZEK") ||
    firstElement[2].querySelector("a._1fQZEK") ||
    firstElement[2].querySelector("a.s1Q9rs");

  dataF = {
    flipkart: {
      title: titleTemp.innerHTML,
      img: imgTemp.src,
      price: priceTemp.innerHTML,
      link: `https://www.flipkart.com${linkTemp.href}`,
    },
  };

  return dataF;
}

const searchHandler = async (item) => {
  if (item === "") {
    return null;
  }
  const aData = await amazonSearch(item);
  const fData = await flipkartSearch(item);

  data = {
    ...aData,
    ...fData,
  };
  console.log(data);
};
