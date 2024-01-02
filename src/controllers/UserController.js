const {UserOTP, UserVerify} = require("../services/UserService");

exports.UserLogin=async (req,res)=>{
    let result=  await UserOTP(req)
    return res.status(200).json(result)
}


exports.UserVerify = async (req, res) => {
    let result = await UserVerify(req);
    res.cookie('token', result['token']) //for web cookie
    return res.status(200).json(result); // for other's
}

exports.UserLogout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'User Logout',
    });
}
