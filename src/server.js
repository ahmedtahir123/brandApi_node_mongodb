/**
 * Main application file
 */

"use strict";

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const path = require("path");
const routes=require("./api/brands/index");
const bodyParser = require('body-parser');

// Connect to database

const options = {
  poolSize: 10,
  reconnectTries: Number.MAX_VALUE,
  keepAlive: 1,
  socketTimeoutMS: 90000,
  connectTimeoutMS: 90000,
  auto_reconnect: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

mongoose.connect(config.mongo.uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


// Setup server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes)




// Start server
app.listen(config.port)



// Expose app
exports = module.exports = app;
