const express = require('express');
const productClicks = require('../models/dbProductClickModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    productClicks.add(req.body)
    .then(productClick => {
        res.status(200).json(productClick)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     productClicks.find()
//     .then(productClick =>{
//         res.status(200).json(productClick);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT product_click.id, product_click.product_id, COUNT(*) AS count, products.product_name FROM product_click JOIN products WHERE products.id = product_click.product_id GROUP BY product_id;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    productClicks.findById(id)
    .then(productClick => {
        if (productClick) {
            res.status(200).json(productClick);
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
    productClicks.remove(id)
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
    productClicks.update(id, changes)
    .then(productClick => {
        if (productClick) {
            res.status(200).json(productClick)
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
    productClicks.findByName(product_id)
    .then(productClick => {
        if (productClick) {
            res.status(200).json(productClick);
        } else {
            res.status(404).send({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
        console.log(error);
    });
})
module.exports = router;