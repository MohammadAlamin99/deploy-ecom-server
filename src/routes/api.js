const express = require("express");
const router = express.Router();
const BrandController = require("../controllers/BrandController");
const CategoryController = require("../controllers/CategoryController");
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const InvoiceController = require("../controllers/InvoiceController");
const ProfileController = require("../controllers/ProfileController")
const AuthVerification = require("../middlewares/AuthVerification");

// Brand category
router.get("/BrandList", BrandController.BrandList);
router.get("/CategoryList", CategoryController.CategoryList);

// Product
router.get("/SliderList", ProductController.SliderList);
router.get("/ListByCategory/:categoryID", ProductController.ListByCategory);
router.get("/ListBySmilier/:categoryID", ProductController.ListBySmilier);
router.get("/ListByBrand", ProductController.ListByBrand);
router.get("/ListByKeyword/:keyword", ProductController.ListByKeyword);
router.get("/ListReview", ProductController.ListReview);
router.get("/ProductDetails/:id", ProductController.ProductDetails);
router.get("/ListByRemark/:remark", ProductController.ListByRemark);


router.get("/WishList",AuthVerification, ProductController.WishList);
router.post("/CreateWishList", AuthVerification, ProductController.CreateWishList);
router.post("/RemoveWishList",AuthVerification, ProductController.RemoveWishList);

router.get("/CartList", AuthVerification,ProductController.CartList);
router.post("/CreateCartList",AuthVerification, ProductController.CreateCartList);
router.post("/RemoveCartList",AuthVerification, ProductController.RemoveCartList);


// User
router.post("/UserLogin", UserController.UserLogin);
router.post("/UserVerify", UserController.UserVerify);
router.get("/UserLogout", UserController.UserLogout);

// profile
router.post("/CreateProfile",AuthVerification, ProfileController.CreateProfile);
router.get("/UpdateProfile",AuthVerification, ProfileController.UpdateProfile);
router.get("/ReadProfile",AuthVerification, ProfileController.ReadProfile);

// Invoice
router.get("/InvoiceCreate",AuthVerification,InvoiceController.InvoiceCreate);
router.get("/InvoiceList",AuthVerification,InvoiceController.InvoiceList);
router.get("/InvoiceProductList",AuthVerification,InvoiceController.InvoiceProductList);


router.post("/PaymentSuccess/:trxId",InvoiceController.PaymentSuccess);
router.post("/PaymentFail/:trxId",InvoiceController.PaymentFail);
router.post("/PaymentCancel/:trxId",InvoiceController.PaymentCancel);
router.post("/PaymentIPN/:trxId",InvoiceController.PaymentIPN);


module.exports = router;