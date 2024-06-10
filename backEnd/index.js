const dataD = require("./dataB");
const TiubimIdaniimHaktzaData = require("./dataB");
const TiubimIdaniimTkinaData = require("./dataB");

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
  console.log("Received state from frontend:", state);
  //res.send("State received successfully."); // Send response back to frontend
});

app.get("/gett", (req, res) => {
  console.log(dataD);
  res.send(dataD);
});

app.get("/getTiubimIdaniimHaktzaData", (req, res) => {
  console.log(TiubimIdaniimHaktzaData);
  res.send(TiubimIdaniimHaktzaData);
});

app.get("/getTiubimIdaniimTkinaData", (req, res) => {
  console.log(TiubimIdaniimTkinaData);
  res.send(TiubimIdaniimTkinaData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
