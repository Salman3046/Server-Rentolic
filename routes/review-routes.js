const express = require('express');
const review = require('../models/dbReviewModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    review.add(req.body)
    .then(rev => {
        res.status(200).json(rev)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
    })
})

// get categoryModels from database
router.get("/", (req, res) => {
    review.find()
    .then(rev =>{
        res.status(200).json(rev);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive categoryModels !"})
    })
})

// find categoryModels by id 
router.get("/:id", (req, res) => { 
    const {id} = req.params;
    review.findById(id)
    .then(rev => {
        if (rev) {
            res.status(200).json(rev);
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
    });
})


// delete categoryModels by id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    review.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "Successfully deleted"})
        } else {
            res.status(404).json({message: "Unable to find record"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform action"})
    })
})

// update or edit categoryModels
router.patch("/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body 
    review.update(id, changes)
    .then(rev => {
        if (rev) {
            res.status(200).json(rev)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find categoryModels by name 
router.get("/search/:product_id", (req, res) => {
    const {product_id} = req.params;
    review.findByName(product_id)
    .then(rev => {
        if (rev) {
            res.status(200).json(rev);
        } else {
            res.status(404).send({ message: "Record not found"});
        } 
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
        console.log(error);
    });
})

// find categoryModels by name 
// router.get("/search/:lender_id", (req, res) => {
//     const {lender_id} = req.params;
//     review.findByName(lender_id)
//     .then(rev => {
//         if (rev) {
//             res.status(200).json(rev);
//         } else {
//             res.status(404).send({ message: "Record not found"});
//         } 
//     })
//     .catch(error => {
//         res.status(500).json({message: "Unable to Perform Action"})
//         console.log(error);
//     });
    // var sql = "SELECT review.*, city.city_name, statusssss.status_name, city.currency_name FROM review JOIN city, statusssss WHERE city.id = review.city AND statusssss.id = review.status AND review.lender_id = '" + connection.escape(lender_id) + "' ";
    // db.query(sql, function (err, data, fields) {
    //     if (err) throw err;
    //     res.json(data)
    // });
// })

// router.get('/', function (req, res, next) {
//     var sql = 'SELECT review.*, city.city_name, statusssss.status_name FROM review JOIN city, statusssss WHERE city.id = review.city AND statusssss.id = review.status;';
//     db.query(sql, function (err, data, fields) {
//         if (err) throw err;
//         res.json(data)
//     });
// });
module.exports = router;