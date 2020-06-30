exports.badRes = function (res, message, status = 500, type = "") {
  return res
    .status(status)
    .json({ success: false, value: null, message, type });
};

exports.goodRes = function (res, value) {
  return res.status(200).json({ success: true, value, message: "" });
};

exports.to = function (promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
};
