/**
 * Main application file
 */

"use strict";

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");

/**
 * Controllers (route handlers).
 */
const brandController = require("./controllers/Brands");

// Connect to database

const options = {
  poolSize: 10,
  reconnectTries: Number.MAX_VALUE,
  keepAlive: 1,
  socketTimeoutMS: 90000,
  connectTimeoutMS: 90000,
  auto_reconnect: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

mongoose.connect(config.mongo.uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// Setup server
const app = express();
var router = express.Router();
app.use(express.json());

app.use("/partner/v1/public/admin/brands", router);

/**
 * Primary app routes.
 */

router.route(`/search`).get(brandController.getBrandNamesList);
router
  .route("/")
  .get(brandController.getBrandList)
  .post(brandController.addBrand)
  .patch(brandController.enableDisableBrandList)
  .delete(brandController.deleteAllBrands);

router
  .route("/:id")
  .get(brandController.getBrandById)
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrandById);

app.get(
  `/search-service/v1/public/consumer/brand-detail`,
  brandController.getBrandDetail
);

// app.patch(
//   `/deal/v1/public/admin/bookBrands/popularBrands/add`,
//   brandController.addSelectedBrands
// ); // how To?
// app.patch(
//   `/deal/v1/public/admin/bookBrands/popularBrands/remove`,
//   brandController.removeSelectedBrands
// ); // how To?
// app.get(
//   `/deal/v1/public/admin/bookBrands/:id`,
//   brandController.getBookBrandList
// ); // how To?
// app.get(
//   `/deal/v1/public/admin/bookBrands/:id/popularBrands`,
//   brandController.getSelectedBrandList
// ); // how To?

// Start server
app.listen(config.port);

// Expose app
exports = module.exports = app;
