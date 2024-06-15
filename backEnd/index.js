const dataD = require("./dataB");
const TiubimIdaniimHaktzaData = require("./dataB");
const TiubimIdaniimTkinaData = require("./dataB");
const dataShit = require("./dataShit");
const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  Credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/log", (req, res) => {
  const state = req.body.dataToPass; // Get the state from the request body
  // console.log("Received state from frontend:", state);
  //res.send("State received successfully."); // Send response back to frontend
});

app.get("/gett", (req, res) => {
  // console.log(dataShit);
  res.send(dataShit);
});

app.post("/gett", (req, res) => {
  const newData = req.body;
  dataShit.push(newData);
  for (let i = 0; i < dataShit.length; i++) {
    // console.log(dataShit[i]);
  }
  fs.writeFileSync(
    path.join(__dirname, "dataShit.js"),
    `module.exports = ${JSON.stringify(dataShit, null, 2)};\n`
  );

  res.status(201).json(newData);
});

app.patch("/gett/:id", (req, res) => {
  const id = req.params;
  const e = req.body;
  console.log(e);
  console.log(id);

  const item = dataShit.find((item) => item.id == id.id);
  if (item) {
    item.name = e.e;
    console.log(item);
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.get("/getTiubimIdaniimHaktzaData", (req, res) => {
  // console.log(TiubimIdaniimHaktzaData);
  res.send(TiubimIdaniimHaktzaData);
});

app.get("/getTiubimIdaniimTkinaData", (req, res) => {
  // console.log(TiubimIdaniimTkinaData);
  res.send(TiubimIdaniimTkinaData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
