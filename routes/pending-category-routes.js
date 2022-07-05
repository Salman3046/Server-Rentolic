const express = require('express');
const products = require('../models/dbProductsModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels

router.get('/', function (req, res, next) {
    // var sql = 'SELECT category.*, lender.lender_name, lender.lender_email, lender.lender_phone, statusssss.status_name FROM category JOIN lender, statusssss WHERE lender.id = category.lender_id AND statusssss.status_id = category.status AND category.status = "2";';
    var sql = 'SELECT * FROM `category` WHERE deleted = 1;;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router;