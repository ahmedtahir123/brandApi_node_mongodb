const brands = require("../models/model");
const fs = require("fs");
const mongoose = require("mongoose");
const { send } = require("process");




  exports.getBrandNamesList = function(req, res) {
    brands.find({}, (err, result)=> {
    const media = result.map(element => element.name);
      if (err) res.send(err);
        res.json(media)
    });
  };
  exports.getBrandList = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.enableDisableBrandList = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.addBrand = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.getBrandById = function(req, res) {
    brands.findById(req.params.id, function(err, user){
        if (err) res.send("no user found!");
        res.send(user);
      });
  };
  exports.updateBrand = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.deleteAllBrands = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.deleteBrandById = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.getBookBrandList = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.getSelectedBrandList = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.addSelectedBrands = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.removeSelectedBrands = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
  exports.getBrandDetail = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)
    });
  };
 
// exports.create = function(req,res) {
//     return new Promise((resolve, reject) => {
//       const commentObj = {
//         createdAt: "2020-04-07T10:56:35.748+0000",
//         updatedAt: "2020-04-07T10:56:35.812+0000",
//         createdBy: "osama pasha",
//         updatedBy: "osama pasha",
//         code: "ce651bdb-f615-4214-8218-463ecc2dc100",
//         name: "Junaid Jamshaid",
//         marketingPunchLine: "marketPunchLine",
//         mainWebsite: "mainWebsite",
//         description: "description",
//         brandCategory: "Cloth",
//         headOfficeAddress: "DHA Phase 2",
//         corporateNumber: "23423434234",
//         customerSupportNumber: "2434254554",
//         tollFreeNumber: "345353",
//         cusSupportEmail: "sws@gmail.com",
//         numberOfPartners: 100,
//       };
//     //   console.log(">>>>>>>>>>>>>>>>>..",commentObj)

//       brands.create(commentObj, function(err, comment) {
//         if (err) return err;
//         const obj = { _id: comment.code };
//         res.json(obj)
//       });
//     });
//   };




