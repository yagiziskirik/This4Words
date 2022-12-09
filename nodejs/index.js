// Copyright (c) 2022 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

const jsonParser = bodyParser.json();

const rawData = fs.readFileSync("lst.json");
const lst = JSON.parse(rawData);

const addZero = (n) => {
  if (n < 10) return "00";
  if (n < 100) return "0";
  return "";
};

const seedGenerator = (x1, y1) => {
  var x = x1 + 180;
  var y = y1 + 90;

  x = addZero(x) + Math.floor(x * 100000).toString();
  y = addZero(y) + Math.floor(y * 100000).toString();
  return parseInt(x + y);
};

const rData = (n) => {
  var q = n;
  let l = lst.length;
  var t = "";
  for (var i = 3; i >= 0; i--) {
    let a1 = Math.floor(q / l ** i);
    q -= a1 * l ** i;
    t += lst[a1] + ".";
  }
  return t.slice(0, -1);
};

const reparseData = (s) => {
  let q = s.split(".");
  var t = 0;
  var aa = 0;
  for (var i = q.length - 1; i >= 0; i--) {
    t += lst.indexOf(q[i]) * lst.length ** aa;
    aa++;
  }
  let q1 = t.toString();
  let qS = q1.slice(0, -8);
  let qE = q1.slice(-8);
  let x = parseInt(qS) / 100000 - 180;
  let y = parseInt(qE) / 100000 - 90;
  return { x: x.toFixed(5), y: y.toFixed(5) };
};

app.listen(8000, () => {
  console.log("API Alive!");
});

app.get("/", (_, res) => {
  res.status(200).send("Get detailed information at the website.");
});

app.post("/encrypt", jsonParser, (req, res) => {
  const data = req.body;
  const x = parseFloat(data.xCoord);
  const y = parseFloat(data.yCoord);

  const seed = seedGenerator(x, y);
  const result = rData(seed);
  res.status(200).send(result);
});

app.post("/decrypt", jsonParser, (req, res) => {
  const data = req.body;
  const str = data.str;

  const result = reparseData(str);
  res.status(200).send(result);
});
