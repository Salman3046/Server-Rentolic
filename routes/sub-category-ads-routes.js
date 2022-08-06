const express = require('express');
const subCategoryAds = require('../models/dbSubCategoryAdsModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    subCategoryAds.add(req.body)
        .then(subCategoryAd => {
            res.status(200).json(subCategoryAd)
        })
        .catch(error => {
            res.status(500).json({ message: "Failed to Add !" })
            console.log(error)
        })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     subCategoryAds.find()
//     .then(subCategoryAd =>{
//         res.status(200).json(subCategoryAd);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT sub_category_ads.*, statusssss.status_name, category.category_name, sub_category.name FROM sub_category_ads JOIN statusssss, category,sub_category WHERE statusssss.status_id = sub_category_ads.status AND category.id = sub_category_ads.category_id AND sub_category.id = sub_category_ads.sub_category_id;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});


// find categoryModels by id 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    subCategoryAds.findById(id)
        .then(subCategoryAd => {
            if (subCategoryAd) {
                res.status(200).json(subCategoryAd);
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
    subCategoryAds.remove(id)
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
    subCategoryAds.update(id, changes)
        .then(subCategoryAd => {
            if (subCategoryAd) {
                res.status(200).json(subCategoryAd)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        }).catch(error => {
            res.status(500).json({ message: "Unable to update record" })
            console.log(error)
        })
})

// find categoryModels by name 
router.get("/search/:adName", (req, res) => {
    const { adName } = req.params;
    subCategoryAds.findByName(adName)
        .then(subCategoryAd => {
            if (subCategoryAd) {
                res.status(200).json(subCategoryAd);
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