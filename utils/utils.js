exports.badRes = function (res, err) {
  return res.status(404).json({ value: null });
};

exports.goodRes = function (res, value) {
  return res.status(200).json({ value });
};

exports.to = function (promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
};

exports.to = function (promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
};

exports.pagination = (page, size, totalElements) => {
  const Page = Number(page * size);
  const Size = Number(size);

  return {
    Page,
    Size,
    totalElements,
  };
};
