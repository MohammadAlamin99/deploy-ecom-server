const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    brandName : {type:String, trim:true, unique:true, required:true},
    brandImg : {type:String, trim:true, required:true}
    },{timestamps:true, versionKey:false});

const BrandsModel = mongoose.model('brands', dataSchema);
module.exports = BrandsModel; 