const express = require('express');
const subCategoryModels = require('../models/dbSubCategoryModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    subCategoryModels.add(req.body)
        .then(subCategoryModel => {
            res.status(200).json(subCategoryModel)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Failed to Add !" })
        })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     subCategoryModels.find()
//     .then(subCategoryModel =>{
//         res.status(200).json(subCategoryModel);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    subCategoryModels.findById(id)
        .then(subCategoryModel => {
            if (subCategoryModel) {
                res.status(200).json(subCategoryModel);
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
    subCategoryModels.remove(id)
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
    subCategoryModels.update(id, changes)
        .then(subCategoryModel => {
            if (subCategoryModel) {
                res.status(200).json(subCategoryModel)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        }).catch(error => {
            res.status(500).json({ message: "Unable to update record" })
            console.log(error)
        })
})

// find categoryModels by name 
router.get("/category/:category_id", (req, res) => {
    const { category_id } = req.params;
    subCategoryModels.findByName(category_id)
        .then(subCategoryModel => {
            if (subCategoryModel) {
                res.status(200).json(subCategoryModel);
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
// router.get("/category/:category_id", (req, res) => {
//     const { category_id } = req.params;
//     products.findByName(category_id)
//         .then(product => {
//             if (product) {
//                 res.status(200).json(product);
//             } else {
//                 res.status(404).send({ message: "Record not found" });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ message: "Unable to Perform Action" })
//             console.log(error);
//         });
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT sub_category.*, category.category_name, statusssss.status_name FROM sub_category JOIN category, statusssss WHERE category.id = sub_category.category_id AND statusssss.status_id = sub_category.status';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router;