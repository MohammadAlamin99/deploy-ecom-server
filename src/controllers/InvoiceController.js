const {CalculateInvoice, Paymentsuccess, Paymentfail, Paymentcancell, PaymentIpn } = require('../services/InvoiceService')

exports.InvoiceCreate= async (req, res) => {
    let result = await CalculateInvoice(req);
    return res.status(200).json(result);
}


exports.InvoiceList=async (req, res) => {
    return res.status(200).json({
        success:true,
        message:"InvoiceList"
    })
}


exports.InvoiceProductList=async (req, res) => {
    return res.status(200).json({
        success:true,
        message:"InvoiceProductList"
    })
}


exports.PaymentSuccess=async (req, res) => {
   let result = await Paymentsuccess(req);
   return res.status(200).json(result);
}

exports.PaymentFail=async (req, res) => {
    let result = await Paymentfail(req);
    return res.status(200).json(result);
}


exports.PaymentCancel=async (req, res) => {
    let result = await Paymentcancell(req);
    return res.status(200).json(result);
}


exports.PaymentIPN=async (req, res) => {
    let result = await PaymentIpn(req);
    return res.status(200).json(result);
}