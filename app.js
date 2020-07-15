/**
 * Main application file
 */

"use strict";

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const PORT = process.env.PORT || 4000;
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const redis = require("redis");
const { badRes, goodRes } = require("./utils/utils");

//configure redis client on port 6379
const redis_client = redis.createClient();
redis_client.on("error", function (err) {
  console.log("Error " + err);
});

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

//Middleware Function to Check Cache
const checkCache = (req, res, next) => {
  const { id } = req.params;

  //get data value for key =id
  redis_client.get(id, (err, data) => {
    if (err) {
      return badRes(res, err);
    }
    //if no match found
    if (data != null) {
      return goodRes(res, JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

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
  .get(checkCache, brandController.getBrandById)
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrandById);

app.get(
  `/search-service/v1/public/consumer/brand-detail`,
  brandController.getBrandDetail
);

// Start server
app.listen(PORT, () => console.log("Server Started at Port " + PORT));

// Expose app
exports = module.exports = app;
