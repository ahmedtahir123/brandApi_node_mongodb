const express = require("express");
const brands = require("./model");
const router = express();
const controller = require('./controller');


router.get("/",(req,res)=>{
    controller.getAllData(req, res)
})
// router.get("/add",(req,res)=>{
//      controller.create(req, res)
// })
module.exports=router;