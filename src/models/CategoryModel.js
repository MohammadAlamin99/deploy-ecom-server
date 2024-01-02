const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    categoryName : {type:String, trim:true, unique:true, required:true},
    categoryImg : {type:String, trim:true, required:true}
    },{timestamps:true, versionKey:false});

const CategoryModel = mongoose.model('categories', dataSchema);
module.exports = CategoryModel; 