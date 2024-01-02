const BrandsModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel")
const ProductModel = require("../models/ProductModel")
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


// ALL CATEGORY

exports.AllCategory = async ()=>{
    try {
        let data = await CategoryModel.find();
        return {status:"success", data:data};
        
    } catch (e) {
        return{status:"fail", message:"Something Went Wrong"}
    }
}

// ALL BRANDS 

exports.AllBrand = async ()=>{
    try {
       let data =  await BrandsModel.find();
       return{status:"success", data:data}
    } catch (e) {
        return{status:"fail", message:"Something Went Wrong"}
    }
}


// PRODUCT REMARK

exports.ProductBYRemark= async (req)=>{
    try {
        let remark=req.params.remark;
        let JoinStage1 = {$lookup:{from:"categories",localField:"categoryID", foreignField:"_id", as:"category"}}
        let JoinStage2 = {$lookup:{from:"brands",localField:"brandID", foreignField:"_id", as:"brand"}}

        let matchStage = {$match:{remark:remark}}

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        
         let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate(
            [matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage]
        )
        return {status:"success", data:data}
        
    }
    catch(e){
        return {status:"fail", data:e.toString()}
    }
}


exports.ProductBYCategory=async(req,res)=>{
    try{
        let categoryID=new ObjectId(req.params.categoryID)

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage= {$match: {categoryID:categoryID}}

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}

    // 

exports.ProductBYBrand= async (req)=>{
    try{
        let brandID=new ObjectId(req.params.brandID)

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage= {$match: {brandID:brandID}}

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}






exports.ProductBYCategoryLimit10= async (req)=>{
    try{
        let categoryID=new ObjectId(req.params.categoryID)

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage= {$match: {categoryID:categoryID}}

        let limit= {$limit:10}

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage,limit, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}


exports.ProductBYSlider= async (req)=>{
    try{
        let matchStage= {$match: {}}
        let limit= {$limit:5}
        let data=await ProductSliderModel.aggregate([matchStage,limit])
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}


exports.ProductBYKeyword= async (req)=>{
    try{


        let SearchRegex = {"$regex": req.params.keyword, "$options": "i"}
        let SearchParam = [{title: SearchRegex},{shortDes: SearchRegex}]
        let SearchQuery = {$or:SearchParam}

        let matchStage=  {$match: SearchQuery};

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};


        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage])


        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}

exports.DetailsBYID= async (req)=>{
    try{
        let ProductID=new ObjectId(req.params.id)

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let JoinStage3={$lookup: {from: "productdetails", localField: "_id", foreignField: "productID", as: "details"}};

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0,'details._id':0,'details.productID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}
        let unwindDetailsStage={$unwind: "$details"}

        let matchStage=  {$match: {_id:ProductID}};

        let data=await ProductModel.aggregate([
            matchStage,
            JoinStage1,
            JoinStage2,
            JoinStage3,
            unwindCategoryStage,
            unwindBrandStage,
            unwindDetailsStage,
            projectionStage,
        ])
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", data:e.toString()}
    }
}

