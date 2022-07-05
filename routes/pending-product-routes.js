const express = require('express');
const products = require('../models/dbProductsModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels

router.get('/', function (req, res, next) {
    var sql = 'SELECT products.* FROM products WHERE products.is_approved = "0";';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router; 