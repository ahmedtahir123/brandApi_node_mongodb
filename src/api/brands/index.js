const express = require("express");
const brands = require("./model");
const router = express();
const controller = require('./controller');


// router.get("/",(req,res)=>{
//     controller.getAllData(req, res)
// })
// router.get("/add",(req,res)=>{
//     console.log("posting")
//      controller.create(req, res)
// })

router.get(`/partner/v1/public/admin/brands/search`,(req,res)=>{
    controller.getBrandNamesList(req, res)
})
router.get(`/partner/v1/public/admin/brands`,(req,res)=>{
    controller.getBrandList(req, res)
})
router.get(`/partner/v1/public/admin/brands/:id`,(req,res)=>{
    controller.getBrandById(req, res)
})
router.get(`deal/v1/public/admin/bookBrands/:id`,(req,res)=>{
    controller.getBookBrandList(req, res)
})
router.get(`deal/v1/public/admin/bookBrands/:id/popularBrands`,(req,res)=>{
    controller.getSelectedBrandList(req, res)
})
router.get(`search-service/v1/public/consumer/brand-detail`,(req,res)=>{
    controller.getBrandDetail(req, res)
})
router.patch(`partner/v1/public/admin/brands`,(req,res)=>{
    controller.enableDisableBrandList(req, res)
})
router.patch(`deal/v1/public/admin/bookBrands/popularBrands/add`,(req,res)=>{
    controller.addSelectedBrands(req, res)
})
router.patch(`deal/v1/public/admin/bookBrands/popularBrands/remove`,(req,res)=>{
    controller.removeSelectedBrands(req, res)
})
router.post(`partner/v1/public/admin/brands`,(req,res)=>{
    controller.addBrand(req, res)
})
router.put(`partner/v1/public/admin/brands/:id`,(req,res)=>{
    controller.updateBrand(req, res)
})
router.delete((`partner/v1/public/admin/brands`,(req,res)=>{
    controller.deleteAllBrands(req, res)
}))
router.delete((`partner/v1/public/admin/brands/:id`,(req,res)=>{
    controller.deleteBrandById(req, res)
}))




// getBrandNamesList: query => get(`partner/v1/public/admin/brands/search`, { params: query }),
//   getBrandList: query => get(`partner/v1/public/admin/brands`, { params: query }),
//   enableBrandList: ids => patch(`partner/v1/public/admin/brands?codes=${ids}&enabled=true`),
//   disableBrandList: ids => patch(`partner/v1/public/admin/brands?codes=${ids}&enabled=false`),
//   addBrand: body => post(`partner/v1/public/admin/brands`, body),
//   getBrandById: id => get(`partner/v1/public/admin/brands/${id}`),
//   updateBrand: (id, brandInfo) => put(`partner/v1/public/admin/brands/${id}`, brandInfo),
//   deleteAllBrands: ids => remove(`partner/v1/public/admin/brands?codes=${ids}`),
//   deleteBrandById: code => remove(`partner/v1/public/admin/brands/${code}`),
//   getBookBrandList: (bookCode, queryParam) =>
//     get(`deal/v1/public/admin/bookBrands/${bookCode}${getListQuery(queryParam)}`),
//   getSelectedBrandList: (bookCode, queryParam) =>
//     get(`deal/v1/public/admin/bookBrands/${bookCode}/popularBrands${getListQuery(queryParam)}`),
//   addSelectedBrands: (bookCode, brandCodes) =>
//     patch(`deal/v1/public/admin/bookBrands/popularBrands/add?bookCode=${bookCode}&brandCodes=${brandCodes}`),
//   removeSelectedBrands: (bookCode, brandCodes) =>
//     patch(`deal/v1/public/admin/bookBrands/popularBrands/remove?bookCode=${bookCode}&brandCodes=${brandCodes}`),
// getBrandDetail: query => get(`search-service/v1/public/consumer/brand-detail?${encodeQueryData(query)}`),


module.exports=router;