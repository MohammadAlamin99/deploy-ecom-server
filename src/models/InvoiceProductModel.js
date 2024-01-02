const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.types.ObjectID, required: true},
    invoiceID:{type:mongoose.Schema.types.ObjectID, required: true},
    productID:{type:mongoose.Schema.types.ObjectID, required: true},
    qty :  {type:String, required:true},
    price :  {type:String, required:true},
    color: {type:String, required:true},
    size: {type:Boolean, required:true},
},{timestamps:true, versionKey:false})

const invoiceModel = mongoose.model('invoices', dataSchema);
module.exports = invoiceModel;