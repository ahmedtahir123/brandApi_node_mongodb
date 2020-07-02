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
app.use(express.json());

/**
 * Primary app routes.
 */
app.get(
  `/partner/v1/public/admin/brands/search`,
  brandController.getBrandNamesList
);
app.get(`/partner/v1/public/admin/brands`, brandController.getBrandList);
app.get(`/partner/v1/public/admin/brands/:id`, brandController.getBrandById);
// app.get(
//   `/deal/v1/public/admin/bookBrands/:id`,
//   brandController.getBookBrandList
// ); // how To?
// app.get(
//   `/deal/v1/public/admin/bookBrands/:id/popularBrands`,
//   brandController.getSelectedBrandList
// ); // how To?
app.get(
  `/search-service/v1/public/consumer/brand-detail`,
  brandController.getBrandDetail
); // how To?
app.patch(
  `/partner/v1/public/admin/brands`,
  brandController.enableDisableBrandList
);
// app.patch(
//   `/deal/v1/public/admin/bookBrands/popularBrands/add`,
//   brandController.addSelectedBrands
// ); // how To?
// app.patch(
//   `/deal/v1/public/admin/bookBrands/popularBrands/remove`,
//   brandController.removeSelectedBrands
// ); // how To?
app.post(`/partner/v1/public/admin/brands`, brandController.addBrand);
app.put(`/partner/v1/public/admin/brands/:id`, brandController.updateBrand);
app.delete(`/partner/v1/public/admin/brands`, brandController.deleteAllBrands);
app.delete(
  `/partner/v1/public/admin/brands/:id`,
  brandController.deleteBrandById
);

// Start server
app.listen(config.port);

// Expose app
exports = module.exports = app;
