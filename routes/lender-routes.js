const express = require('express');
const landerModels = require('../models/dbLanderModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    landerModels.add(req.body)
    .then(landerModel => {
        res.status(200).json(landerModel)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
    })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     landerModels.find()
//     .then(landerModel =>{
//         res.status(200).json(landerModel);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    landerModels.findById(id)
    .then(landerModel => {
        if (landerModel) {
            res.status(200).json(landerModel);
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
    landerModels.remove(id)
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
    landerModels.update(id, changes)
    .then(landerModel => {
        if (landerModel) {
            res.status(200).json(landerModel)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find categoryModels by name 
router.get("/search/:lender_name", (req, res) => {
    const {lender_name} = req.params;
    landerModels.findByName(lender_name)
    .then(landerModel => {
        if (landerModel) {
            res.status(200).json(landerModel);
        } else {
            res.status(404).send({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
        console.log(error);
    });
})

router.get('/', function (req, res, next) {
    var sql = 'SELECT lender.*, city.city_name, statusssss.status_name FROM lender JOIN city, statusssss WHERE city.id = lender.city AND statusssss.status_id = lender.status;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router;