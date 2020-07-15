var _ = require("lodash");
const brands = require("../models/model");
const redis = require("redis");

const redis_client = redis.createClient();
redis_client.on("error", function (err) {
  console.log("Error " + err);
});

const { badRes, goodRes, to, pagination } = require("../utils/utils");

exports.getBrandNamesList = async (req, res) => {
  const [err, result] = await to(brands.distinct("name"));
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.getBrandList = async (req, res) => {
  let { name, brandCategory, enabled, sort, size, page } = req.query;
  const filter = {};
  if (name) {
    filter.name = name;
  }
  if (brandCategory) {
    filter.brandCategory = brandCategory;
  }
  if (enabled) {
    filter.enabled = enabled;
  }
  if (!sort) {
    sort = `updatedAt,desc`;
  }
  const totalElements = await brands.count();
  const pageable = pagination(page, size, totalElements);
  const [err, result] = await to(
    brands
      .find(filter)
      .limit(pageable.Size)
      .sort({ [sort.split(",")[0]]: `${sort.split(",")[1]}` })
  );
  const data = { result, pageable };
  if (err) return badRes(res, err);
  return goodRes(res, data);
};
exports.enableDisableBrandList = async (req, res) => {
  const status = req.query.enabled;
  const Id = req.query.codes.split(",");
  let err, result;
  if (status == "true") {
    // if query for enabling brands
    [err, result] = await to(
      brands
        .find({ $and: [{ _id: { $in: Id } }, { enabled: false }] })
        .updateMany({ enabled: true })
    );
    if (err) return badRes(res, err);
    return goodRes(res, result);
  } else {
    [err, result] = await to(
      brands
        .find({ $and: [{ _id: { $in: Id } }, { enabled: true }] })
        .updateMany({ enabled: false })
    );
    if (err) return badRes(res, err);
    return goodRes(res, result);
  }
};
exports.addBrand = async (req, res) => {
  const [err, result] = await to(brands.create(req.body));
  if (err) return badRes(res, err);
  //Store in Redis
  redis_client.setex(result._id, 3600, JSON.stringify(result));
  return goodRes(res, result);
};
exports.getBrandById = async (req, res) => {
  const [err, result] = await to(brands.findById(req.params.id));
  if (err) return badRes(res, err);
  redis_client.setex(req.params.id, 3600, JSON.stringify(result));
  return goodRes(res, result);
};
exports.updateBrand = async (req, res) => {
  const [err, result] = await to(
    brands.update({ _id: req.params.id }, { $set: req.body })
  );
  if (err) return badRes(res, err);
  redis_client.setex(req.params.id, 3600, JSON.stringify(result));
  return goodRes(res, result);
};
exports.deleteAllBrands = async (req, res) => {
  const Id = req.query.codes.split(",");
  const [err, result] = await to(brands.remove({ _id: { $in: Id } }));
  if (err) return badRes(res, err);
  return goodRes(res, result);
};
exports.deleteBrandById = async (req, res) => {
  const [err, result] = await to(
    brands.findOneAndRemove({ _id: req.params.id })
  );
  if (err) return badRes(res, err);
  redis_client.del(req.params.id);
  return goodRes(res, result);
};
exports.getBrandDetail = async (req, res) => {
  let size = Number(req.query.size);
  let { name, brandCategory, enabled, sort } = req.query;
  const filter = {};
  if (name) {
    filter.name = name;
  }
  if (brandCategory) {
    filter.brandCategory = brandCategory;
  }
  if (enabled) {
    filter.enabled = enabled;
  }
  if (!sort) {
    sort = `updatedAt,desc`;
  }

  const [err, result] = await to(
    brands
      .find(filter)
      .limit(size)
      .sort({ [sort.split(",")[0]]: `${sort.split(",")[1]}` })
  );
  const data = result.map((element) => ({
    logo: element.logo.url,
    name: element.name,
    card: element.card.url,
    punchLine: element.marketingPunchLine,
    // rating:element.rating
    // isRatingEnabled: element.isRatingEnabled,
    // outlets: element.outlets,
    outletsCount: element.numberOfPartners,
    // distance:element.distance,
    // totalSaving: element.totalSaving,
    // isDeliveryAvailable: element.isDeliveryAvailable,
    // deals:element.deals,
  }));

  if (err) return badRes(res, err);
  return goodRes(res, data);
};
