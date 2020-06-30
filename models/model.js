const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandsSchema = new Schema({
  code: { type: String },
  name: { type: String, required: true },
  brandCategory: { type: String, required: true },
  marketingPunchLine: { type: String },
  mainWebsite: { type: String },
  description: { type: String },
  headOfficeAddress: { type: String },
  corporateNumber: { type: String },
  customerSupportNumber: { type: String, required: true },
  tollFreeNumber: { type: String },
  cusSupportEmail: { type: String },
  numberOfPartners: Number,
  enabled: Boolean,
  card: { type: Object },
  logo: { type: Object },
  bannerImage: Array,
  createdAt: Date,
  updatedAt: Date,
  createdBy: { type: String },
  updatedBy: { type: String },
});

module.exports = mongoose.model("brands", brandsSchema);
