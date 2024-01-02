const {AllCategory}  = require("../services/ProductService")

exports.CategoryList = async(req, res)=>{
    let result = await AllCategory()
    return res.status(200).json(result)
}