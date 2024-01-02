const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectID, required: true},
    payable :  {type:String, required:true},
    cus_details :  {type:String, required:true},
    ship_details :  {type:String, required:true},
    tran_id :  {type:String, required:true},
    val_id :  {type:String, required:true, default:"0"},
    delevary_status :  {type:String, required:true},
    payment_status :  {type:String, required:true},
},{timestamps:true, versionKey:false})

const invoiceModel = mongoose.model('invoices', dataSchema);
module.exports = invoiceModel;