const mongoose = require("mongoose");
const ProductModel = require("../models/ProductModel");
const cartModel = require("../models/CartModel");
const ProfileModel = require("../models/ProfileModel");
const invoiceModel = require("../models/InvoiceModel");
const paymentSettingsModel = require("../models/PymentSettingModel");
const ObjectId = mongoose.Types.ObjectId;
const formData = require("form-data")
const axios = require("axios");

exports.CalculateInvoice= async (req, res)=>{
    try {
        //  invoice calculation
        let user_id = new ObjectId(req.headers.id);
        let cus_email=req.headers.email;

        let data = await cartModel.aggregate([
            {$match:{userID:user_id}},
            {$group:{_id:0, total:{$sum:{ $toInt: "$price" }}}}
        ])

        let payable = data[0].total;
        let tran_id = Math.floor(100000000+Math.random()*900000000);
        let val_id = 0;
        let delevary_status = "panding";
        let payment_status = "panding";

        // customer details
        let profile = await ProfileModel.aggregate([
            {$match:{userID:user_id}},

        ])

        let customerDetails = `Name: ${profile[0].cus_name},Phone no: ${profile[0].cus_phone}, Address: ${profile[0].cus_city}`
        // shiping details
        let shipingDetails = `Name: ${profile[0].ship_name},Phone no: ${profile[0].ship_phone}, Address: ${profile[0].ship_city}`


        // panding payment invoice create

        await invoiceModel.create({
            userID:user_id,
            payable:payable,
            cus_details:customerDetails,
            ship_details:shipingDetails,
            tran_id:tran_id,
            val_id:val_id,
            delevary_status:delevary_status,
            payment_status:payment_status,
            })


            // ssl commarz payment getway call------

    let paymentSettings = await paymentSettingsModel.find();
        const form = new FormData();
        form.append('store_id', paymentSettings[0]['store_id']);
        form.append('store_passwd',  paymentSettings[0]['store_passwd']);
        form.append('total_amount', payable.toString());
        form.append('currency', 'BDT');
        form.append('tran_id', tran_id);
        form.append('success_url', `${paymentSettings[0]['success_url']}/${tran_id}`);
        form.append('fail_url', `${paymentSettings[0]['fail_url']}/${tran_id}`);
        form.append('cancel_url', `${paymentSettings[0]['cancel_url']}/${tran_id}`);
        form.append('ipn_url',  `${paymentSettings[0]['ipn_url']}/${tran_id}`);

        form.append('cus_name', profile[0].cus_name);
        form.append('cus_email', cus_email);
        form.append('cus_add1', profile[0].cus_add);
        form.append('cus_add2', profile[0].cus_add);
        form.append('cus_city', profile[0].cus_city);
        form.append('cus_state', profile[0].cus_state);
        form.append('cus_postcode', profile[0].cus_postcode);
        form.append('cus_country', profile[0].cus_country);
        form.append('cus_phone', profile[0].cus_phone);
        form.append('cus_fax', profile[0].cus_phone);

        form.append('shipping_method', 'YES');
        form.append('ship_name', profile[0].ship_name);
        form.append('ship_add1', profile[0].ship_add);
        form.append('ship_add2', profile[0].ship_add);
        form.append('ship_city', profile[0].ship_city);
        form.append('ship_state', profile[0].ship_state);
        form.append('ship_country', profile[0].ship_country);
        form.append('ship_postcode', profile[0].ship_postcode);
        form.append('product_name', 'product_name');// not 
        form.append('product_category', 'category');//not 
        form.append('product_profile', 'profile');//not 
        form.append('product_amount', '3');//not 



            let SSLRes=await axios.post(paymentSettings[0]['init_url'],form)




            return {status:"success", message:SSLRes.data}

    } catch (e) {
        console.log(e)
        return{status:"fail", message:"Something Went Wrong"};
    }
}


exports.Paymentsuccess = async(req, res)=>{
    try {
        let trxId = req.params.trxId;
        await invoiceModel.updateOne({tran_id:trxId},{payment_status:"success"},{upsert:true});
        return {status:"success"}
    } catch (e) {
        console.log(e)
        return{status:"fail", message:"Something Went Wrong"};
    }
}


exports.Paymentcancell = async(req, res)=>{
    try {
        let trxId = req.params.trxId;
        await invoiceModel.updateOne({tran_id:trxId}, {payment_status:"canell"})
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

exports.Paymentfail = async(req, res)=>{
    try {
        let trxId = req.params.trxId;
        await invoiceModel.updateOne({tran_id:trxId}, {payment_status:"fail"})
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

exports.PaymentIpn = async(req, res)=>{
    try {
        let trxId = req.params.trxId;
        let status = req.body['status'];
        await invoiceModel.updateOne({tran_id:trxId},{payment_status:status})
        return {status:"payment fail"}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}