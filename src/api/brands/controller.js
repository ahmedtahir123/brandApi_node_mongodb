const brands = require("./model");
const fs = require("fs");
const mongoose = require("mongoose");




  exports.getAllData = function(req, res) {
    brands.find({}, (err, result)=> {
      if (err) res.send(err);
        res.json(result)

  
    });
  };
 
// exports.create = function(data) {
//     return new Promise((resolve, reject) => {
//       const commentObj = {
//         username: "Gulzar Ahmed",
//         createdAt:"Mon Mar 16 2020 16:31:32 GMT+0500 (Pakistan Standard Time)",
//         updatedAt:"Mon Mar 16 2020 16:31:32 GMT+0500 (Pakistan Standard Time)",
//       };
//       console.log(">>>>>>>>>>>>>>>>>..",commentObj)

//       brands.create(commentObj, function(err, comment) {
//         if (err) return err;
//         const obj = { _id: comment.createdAt };
//         return resolve(obj);
//       });
//     });
//   };




