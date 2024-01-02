const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectID, required: true},
    productID:{type:mongoose.Schema.types.ObjectID, required: true},
    des :  {type:String, required:true},
    rating :  {type:String, required:true},
},{timestamps:true, versionKey:false})

const reviewModel = mongoose.model('reviews', dataSchema);
module.exports = reviewModel;