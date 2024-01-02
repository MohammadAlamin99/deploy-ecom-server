const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    title : {type:String, trim:true, unique:true, required:true},
    shortDes : {type:String, trim:true, required:true},
    price : {type:String, trim:true, required:true},
    discount : {type:Boolean, trim:true, default:false},
    discountPrice : {type:String, trim:true, required:true},
    image: {type:String, trim:true, required:true},
    stock: {type:Boolean, trim:true, required:true,default:true},
    star: {type:String, trim:true, required:true},
    remarks: {type:String, trim:true, required:true, enum:["new", "trending", "popular", "special", "regular", "top"]},
    },{timestamps:true, versionKey:false});

const ProductModel = mongoose.model('products', dataSchema);
module.exports = ProductModel; 