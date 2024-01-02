const {AllBrand}  = require("../services/ProductService")

exports.BrandList = async(req, res)=>{
    let result = await AllBrand()
    return res.status(200).json(result)
}