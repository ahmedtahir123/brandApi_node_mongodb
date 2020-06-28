
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandsSchema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
    code: String,
    name: String,
    marketingPunchLine: String,
    mainWebsite: String,
    description: String,
    brandCategory: String,
    headOfficeAddress: String,
    corporateNumber: String,
    customerSupportNumber: String,
    tollFreeNumber: String,
    cusSupportEmail: String,
    numberOfPartners: Number,
});

module.exports = mongoose.model("brands", brandsSchema);


