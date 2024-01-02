const CartModel = require("../models/CartModel")
const mongoose = require("mongoose");
const ProductModel = require("../models/ProductModel");
const ObjectId = mongoose.Types.ObjectId;


exports.CreateCart= async (req, res)=>{
    try {
        let user_id = req.headers.id;
        let reqBody = req.body;  //product id
        let productID = reqBody.productID; //store product id

        // price calculation
        let product = await ProductModel.findOne({_id:productID});
        let price=product.price;
        if(product.discount){
            price = product.discountPrice;
        }
        let totalPrice = price* reqBody.qty;

        reqBody.userID = user_id;
        reqBody.price = totalPrice;

        await CartModel.updateOne({userID:user_id, productID:reqBody.productID}, {$set:reqBody}, {upsert:true})
        return {status:"success", message:"Add To Cart Successfully"}

    } catch (e) {
      
        return ({status:"fail", message:"something went wrong"})
        
    }
}


exports.RemoveCart= async (req, res)=>{
    try {
        let user_id = req.headers.id;
        let reqBody = req.body;  //product id
        // reqBody.userID = user_id;

        await CartModel.deleteOne({userID:user_id, productID: reqBody.productID});
        return({status:"success", message:"Cart Item Deleted"})
        
    } catch (e) {
        console.log(e)
        return ({status:"fail", message:"Something Went Wrong"})
        
    }

    
}


exports.Cart = async(req, res)=>{
    try {
        let user_id = new ObjectId(req.headers.id);

        let matchStage = {$match:{userID:user_id}}

        let JoinStageProduct = {$lookup:{from:"products", localField:"productID", foreignField:"_id", as:"product"}}
        let unwindProductStage = {$unwind:"$product"}

        let JoinStageBrand = {$lookup:{from:"brands", localField:"product.brandID", foreignField:"_id", as:"brand"}}
        let unwindBrand = {$unwind:"$brand"}
        
        
        let JoinStageCategory = {$lookup:{from:"categories", localField:"product.categoryID", foreignField:"_id", as:"category"}}
        let unwindCategory = {$unwind:"$category"}

        let projectionStage = {$project:{"_id":0, "userID":0, "createdAt":0, "updatedAt":0,"product._id":0,
    "product.categoryID":0, "product.brandID":0, "brand._id":0, "category._id":0,
    }}

       let data = await CartModel.aggregate([
            matchStage, JoinStageProduct, unwindProductStage,
            JoinStageBrand, unwindBrand, JoinStageCategory, unwindCategory, projectionStage
        ])
        return({status:"success", data:data})
    } catch (e) {
        return({status:"fail", message:"something went wrong"})
    }
}

