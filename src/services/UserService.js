const sendgmaill = require("../utility/sendgmaill");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const porfileModel = require("../models/ProfileModel");
const { EncodeToken } = require("../utility/TokenHelper");

// USER LOGIN

exports.UserOTP = async (req, res)=>{
   try {
    let {emailTo} = req.body;
    let emailSubject = "Verification System";
    let text = Math.floor(100000+Math.random()*900000);
    await sendgmaill(emailTo, emailSubject, text);
    await UserModel.updateOne(
        {email: emailTo},
        {$set:{otp:text}},
        {upsert:true}
    );  
    return {status:"success", message:"6 digit otp has been successfully"}
   } catch (e) {
    return {status:"fail", message:"Something Went Wrong"}
   }
}

// USER VERIFICATION

exports.UserVerify = async (req)=>{
    try{
        let email=req.body.email;
        let text=req.body.otp;
        if(text==="0"){
            return {status:"fail", message:"unvalid OTP"}
        }
        else {
            let total=await UserModel.find({email: email, otp: text}).count('total');
            if(total===1){
                let user_id=await UserModel.find({email: email, otp: text}).select('_id')
                let token= EncodeToken(email,user_id[0]['_id'].toString())
                await UserModel.updateOne({email:email}, {$set:{otp:'0'}}, {upsert:true})
                return {status:"success", message:"Valid OTP", token:token}
            }else{
                return {status:"fail", message:"Something Went Wrong"}
            }
        }
    }
    catch (e) {
        console.log(e)
        return {status:"fail", data:"Something Went Wrong"}
    }
}


// CREATING / UPDATE PROFILE

exports.SaveProfile = async (req, res)=>{
    try {
        let user_id = req.headers.id;
        let reqbody = req.body;
        reqbody.userID = user_id;
        await porfileModel.updateOne({userID:user_id}, {$set:reqbody}, {upsert:true})
        return {status:"success", message:"Profile Save Changed"}
    } catch (err) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

// VIEW PROFILE DETAILS
 
exports.ProfileDetails = async(req, res)=>{
    try {
        let user_id = req.headers.id;
        let data = await porfileModel.find({userID:user_id});
        return ({status:"success", data:data});
    } catch (error) {
        console.log(error)
        return ({status:"fail", message:"Something Went Wrong"});
    }
}
