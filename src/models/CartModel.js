const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectID, required: true},
    productID:{type:mongoose.Schema.Types.ObjectID, required: true},
    qty :  {type:String, required:true},
    price :  {type:String, required:true},
    color: {type:String, required:true},
    size: {type:String, required:true},
},{timestamps:true, versionKey:false})

const cartModel = mongoose.model('carts', dataSchema);
module.exports = cartModel;