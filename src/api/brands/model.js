
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandsSchema = new Schema({
username: String,
createdAt: String,
updatedAt: String,
});

module.exports = mongoose.model("brands", brandsSchema);


