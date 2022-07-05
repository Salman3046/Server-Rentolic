const express = require('express');
const products = require('../models/dbProductsModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels

router.get('/', function (req, res, next) {
    var sql = 'SELECT products.*, (SELECT TRUNCATE((SUM(review.rating)/COUNT(review.product_id)), 1) from review WHERE products.id=review.product_id GROUP BY review.product_id) AS avg_rating , city.city_name, statusssss.status_name, category.category_name, sub_category.name FROM products JOIN city, statusssss, sub_category, category, review WHERE city.id = products.city AND statusssss.id = products.status AND category.id = products.category_id AND sub_category.id = products.sub_category_id AND products.status = "1" AND products.is_approved = "1" GROUP BY products.id order BY id DESC LIMIT 12;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router;