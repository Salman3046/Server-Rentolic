const express = require('express');
const productClicks = require('../models/dbProductClickModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels

router.get('/', function (req, res, next) {
    var sql = 'select * from product_click';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});


module.exports = router;