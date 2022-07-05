const express = require('express');
const products = require('../models/dbProductsModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels

router.get('/', function (req, res, next) {
    // var sql = 'SELECT sub_category.*, lender.lender_name,category.category_name, lender.lender_email, lender.lender_phone, statusssss.status_name FROM sub_category JOIN lender, statusssss, category WHERE category.id = sub_category.category_id AND lender.id = sub_category.lender_id AND statusssss.status_id = "2" AND sub_category.status = "2";';

    var sql = 'SELECT sub_category.*, category.category_name FROM sub_category JOIN category WHERE verification_required = 1 AND sub_category.status = 0 AND category.id = sub_category.category_id;;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router;