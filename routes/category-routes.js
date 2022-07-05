const express = require('express');
const categoryModels = require('../models/dbCategoryModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    categoryModels.add(req.body)
        .then(categoryModel => {
            res.status(200).json(categoryModel)
        })
        .catch(error => {
            res.status(500).json({ message: "Failed to Add !" })
            console.log(error)
        })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     categoryModels.find()
//         .then(categoryModel => {
//             res.status(200).json(categoryModel);
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Unable to retrive categorys !" })
//         })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT category.*, statusssss.status_name FROM category JOIN statusssss WHERE statusssss.id = category.status AND (category.status = "1" OR category.status = "0");';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    categoryModels.findById(id)
        .then(categoryModel => {
            if (categoryModel) {
                res.status(200).json(categoryModel);
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
    categoryModels.remove(id)
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
    categoryModels.update(id, changes)
        .then(categoryModel => {
            if (categoryModel) {
                res.status(200).json(categoryModel)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        }).catch(error => {
            res.status(500).json({ message: "Unable to update record" })
            console.log(error)
        })
})

// find categoryModels by name 
router.get("/search/:lender_id", (req, res) => {
    const { lender_id } = req.params;
    categoryModels.findByName(lender_id)
        .then(categoryModel => {
            if (categoryModel) {
                res.status(200).json(categoryModel);
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
router.get("/search/:category_name", (req, res) => {
    const { category_name } = req.params;
    categoryModels.findByName(category_name)
        .then(categoryModel => {
            if (categoryModel) {
                res.status(200).json(categoryModel);
            } else {
                res.status(404).send({ message: "Record not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to Perform Action" })
            console.log(error);
        });
})
module.exports = router;