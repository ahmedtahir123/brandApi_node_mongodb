const brands = require("../models/model");
const { badRes, goodRes, to } = require("../utils/utils");

exports.getBrandNamesList = async (req, res) => {
  const [err, result] = await to(brands.find({}));
  if (err) return badRes(res, err);
  let data = result.map((element) => element.name);
  data = [...new Set(data)];
  return goodRes(res, data);
};
exports.getBrandList = async (req, res) => {
  const [err, result] = await to(brands.find({}));
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.enableDisableBrandList = async (req, res) => {
  const status = req.query.status;
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", status);
  const Id = req.params.id;
  let err, result;
  [err, result] = await to(
    brands.findOneAndUpdate(
      { _id: Id },
      {
        $set: { enable: status },
      }
    )
  );
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.addBrand = async (req, res) => {
  const [err, result] = await to(brands.create(req.body));
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.getBrandById = async (req, res) => {
  const [err, result] = await to(brands.findById(req.params.id));
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.updateBrand = async (req, res) => {
  brands.find({}, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
};
exports.deleteAllBrands = async (req, res) => {
  const [err, result] = await to(brands.remove({}));
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.deleteBrandById = async (req, res) => {
  const [err, result] = await to(
    brands.findOneAndRemove({ _id: req.params.id })
  );
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.getBookBrandList = async (req, res) => {
  brands.find({}, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
};
exports.getSelectedBrandList = async (req, res) => {
  brands.find({}, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
};
exports.addSelectedBrands = async (req, res) => {
  brands.find({}, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
};
exports.removeSelectedBrands = async (req, res) => {
  brands.find({}, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
};
exports.getBrandDetail = async (req, res) => {
  brands.find({}, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
};
