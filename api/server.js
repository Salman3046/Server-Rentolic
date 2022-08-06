const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const categoryRoutes = require('../routes/category-routes');
const subCategory = require('../routes/sub-category-routes');
const city = require('../routes/city-routes');
const products = require('../routes/products-routes');
const users = require('../routes/users-routes');
const admin = require('../routes/admin-routes');
const lender = require('../routes/lender-routes');
const ads = require('../routes/ads-routes');
const pendingCategory = require('../routes/pending-category-routes');
const pendingProduct = require('../routes/pending-product-routes');
const pendingSubCategory = require('../routes/pending-sub-category-routes');
const login = require('../routes/login-api-routes');
const states = require('../routes/states-routes');
const testimonials = require('../routes/testimonial-routes');
const weeklyProducts = require('../routes/weekly-products-routes');
const contactus = require('../routes/contactus-routes');
const blogs = require('../routes/blogs-routes');
const privacyPolicy = require('../routes/privacy-policy-routes');
const termsCondition = require('../routes/terms-condition-routes');
const slider = require('../routes/slider-routes');
const review = require('../routes/review-routes');
const productClick = require('../routes/product-click-routes');
const about = require('../routes/about-routes');
const productClickCount = require('../routes/product-click-count-routes');
const contact = require('../routes/contact-routes');
const editProducts = require('../routes/edit-products-routes');
const approvedProduct = require('../routes/approved-product-routes');
const declineProduct = require('../routes/decline-product-routes');
const cityPending = require('../routes/city-pending-routes');
const reviewAdmin = require('../routes/review-admin-routes');
const starReview = require('../routes/star-review-routes');
const subCategoryAds = require('../routes/sub-category-ads-routes');
// forgot password 🌹
const forgotPassword = require('../routes/forgot-password-routes');

// IMAGES IS HERE
const adsimage = require('../routes/image_upload_routes/ads-image-routes');
const cityImage = require('../routes/image_upload_routes/city-image-routes');
const testiImage = require('../routes/image_upload_routes/testi-image-routes');
const subcatImage = require('../routes/image_upload_routes/subcat-image-routes');
const blogImage = require('../routes/image_upload_routes/blog-image-routes');
const catImage = require('../routes/image_upload_routes/cat-image-routes');
const sliderImage = require('../routes/image_upload_routes/slider-image-routes');
const productImage = require('../routes/image_upload_routes/product-image-routes');
const profileImage = require('../routes/image_upload_routes/profile-image-routes');
const adSubCategoryImage = require('../routes/image_upload_routes/ads-sub-category-routes');




const server = express(); 
// Upload file fetch
server.use('/image', express.static('upload/images'));
server.use(express.json());

// header
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    next();
  });

server.get("/", (req, res) => {
    res.json({message : "message"});
});
 
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
 
server.use("/api/admin/category", categoryRoutes);
server.use("/api/admin/sub_category", subCategory);
server.use("/api/admin/city", city);
server.use("/api/admin/products", products);
server.use("/api/admin/users", users);
server.use("/api/admin/admins", admin);
server.use("/api/admin/lender", lender);
server.use("/api/admin/ads", ads);
server.use("/api/admin/pending-category", pendingCategory);
server.use("/api/admin/pending-product", pendingProduct);
server.use("/api/admin/pending-sub-category", pendingSubCategory);
server.use("/api/admin/login", login);
server.use("/api/admin/states", states);
server.use("/api/admin/testimonials", testimonials);
server.use("/api/admin/weekly_products", weeklyProducts);
server.use("/api/admin/contactus", contactus);
server.use("/api/admin/blogs", blogs);
server.use("/api/admin/privacy_policy", privacyPolicy);
server.use("/api/admin/terms_condition", termsCondition);
server.use("/api/admin/slider", slider);
server.use("/api/admin/review", review);
server.use("/api/admin/product_click", productClick);
server.use("/api/admin/about", about);
server.use("/api/admin/product_click_count", productClickCount);
server.use("/api/admin/contact", contact);
server.use("/admin/edit-products", editProducts);
server.use("/api/admin/approved-product", approvedProduct);
server.use("/api/admin/decline-product", declineProduct);
server.use("/api/admin/city-pending", cityPending);
server.use("/api/admin/review-admin", reviewAdmin);
server.use("/api/admin/star-review", starReview);
server.use("/api/admin/sub_category_ads", subCategoryAds);
// forgot password api 🌹
server.use("/api/forgot-password", forgotPassword);

// IMAGES IS HERE
server.use("/admin/ads", adsimage);
server.use("/admin/web/product", cityImage);
server.use("/admin/testi", testiImage);
server.use("/admin/subcat", subcatImage);
server.use("/admin/blog", blogImage);
server.use("/admin/category", catImage);
server.use("/admin/slider", sliderImage);
server.use("/admin/product", productImage);
server.use("/admin/profile", profileImage);
server.use("/admin/adSubCategorys", adSubCategoryImage);



module.exports = server;