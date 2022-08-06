const express = require('express');
const products = require('../models/dbProductsModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    products.add(req.body)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(error => {
            res.status(500).json({ message: "Failed to Add !" })
            console.log(error)
        })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     products.find()
//     .then(product =>{
//         res.status(200).json(product);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    products.findById(id)
        .then(product => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: "Record not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to Perform Action" })
        });
})


// delete categoryModels by id
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    products.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Successfully deleted" })
            } else {
                res.status(404).json({ message: "Unable to find record" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to perform action" })
        })
})

// update or edit categoryModels
router.patch("/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body
    products.update(id, changes)
        .then(product => {
            if (product) {
                res.status(200).json(product)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        }).catch(error => {
            res.status(500).json({ message: "Unable to update record" })
            console.log(error)
        })
})

// find categoryModels by name 
router.get("/search/:product_name", (req, res) => {
    const { product_name } = req.params;
    products.findByName(product_name)
        .then(product => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).send({ message: "Record not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to Perform Action" })
            console.log(error);
        });
})

// find categoryModels by name 
router.get("/search/:lender_id", (req, res) => {
    const { lender_id } = req.params;
    products.findByName(lender_id)
        .then(product => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).send({ message: "Record not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to Perform Action" })
            console.log(error);
        });
})

router.get('/', function (req, res, next) {
    var sql = 'SELECT products.*, (SELECT TRUNCATE((SUM(review.rating)/COUNT(review.product_id)), 1) from review WHERE products.id=review.product_id GROUP BY review.product_id) AS avg_rating, product_status.is_approved_status_name, product_status.color, city.city_name, statusssss.status_name, category.category_name, product_status.text_color ,sub_category.name FROM products JOIN city, statusssss, sub_category, product_status, category, review WHERE city.id = products.city AND statusssss.id = products.status AND category.id = products.category_id AND sub_category.id = products.sub_category_id AND product_status.is_approved_status = products.is_approved GROUP BY products.id order BY id DESC;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router;