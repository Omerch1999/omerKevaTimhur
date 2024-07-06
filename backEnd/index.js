const TiubimIdaniimHaktzaData = require("./dataB");
const TiubimIdaniimTkinaData = require("./dataB");
const dataShit = require("./dataShit");
const dataForInputScreen = require("./dataForInputScreen");
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

app.get("/mekadmi_haktza_level1", (req, res) => {
  res.send(dataForInputScreen.mekadmi_haktza_level1);
});

app.get("/tax_darga_level2", (req, res) => {
  res.send(dataForInputScreen.tax_darga_level2);
});

app.get("/mekadmi_itiaalut_level2", (req, res) => {
  res.send(dataForInputScreen.mekadmi_itiaalut_level2);
});

app.get("/model_segel_tax_level3", (req, res) => {
  res.send(dataForInputScreen.model_segel_tax_level3);
});

app.get("/compare_options_level4", (req, res) => {
  res.send(dataForInputScreen.compare_options_level4);
});

app.get("/tamhil_level6", (req, res) => {
  res.send(dataForInputScreen.tamhil_level6);
});

app.get("/tax_darga_level6", (req, res) => {
  res.send(dataForInputScreen.tax_darga_level6);
});

app.get("/tax_targeted_percentage_level6", (req, res) => {
  res.send(dataForInputScreen.tax_targeted_percentage_level6);
});

app.get("/hitkansutPercentage", (req, res) => {
  res.send(dataForInputScreen.hitkansutPercentage);
});

app.get("/costs_agat", (req, res) => {
  res.send(dataForInputScreen.costs_agat);
});

app.get("/costs_airforce", (req, res) => {
  res.send(dataForInputScreen.costs_airforce);
});

app.get("/avarage_ratio_lvl8", (req, res) => {
  res.send(dataForInputScreen.avarage_ratio_lvl8);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//
//
//
//
//

//
//
//
//
//

//
//
//
//
//

//
//
//
//
//

app.post("/log", (req, res) => {
  const state = req.body.dataToPass; // Get the state from the request body
  // console.log("Received state from frontend:", state);
  //res.send("State received successfully."); // Send response back to frontend
});

app.get("/gett", (req, res) => {
  // console.log(dataShit);
  res.send(dataShit.omer);
});

app.get("/gett1", (req, res) => {
  // console.log(dataShit);
  res.send(dataShit.max);
});

app.post("/gett", (req, res) => {
  const newData = req.body;
  dataShit.omer.push(newData);
  for (let i = 0; i < dataShit.length; i++) {
    // console.log(dataShit[i]);
  }
  fs.writeFileSync(
    path.join(__dirname, "dataShit.js"),
    `module.exports = ${JSON.stringify(dataShit, null, 2)};\n`
  );

  res.status(201).json(newData);
});

app.post("/gett2", (req, res) => {
  const newData = req.body;
  dataShit.max.push(newData);
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

  const item = dataShit.omer.find((item) => item.id == id.id);
  if (item) {
    item.name = e.e;
    console.log(item);
    const fileContent = `module.exports = ${JSON.stringify(
      dataShit,
      null,
      2
    )};`;
    fs.writeFileSync(
      path.join(__dirname, "dataShit.js"),
      `module.exports = ${JSON.stringify(dataShit, null, 2)};\n`
    );
    res.status(200).json(dataShit.omer);
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
