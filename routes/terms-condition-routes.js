const express = require('express');
const termsConditions = require('../models/dbTermsConditionModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    termsConditions.add(req.body)
    .then(termsCondition => {
        res.status(200).json(termsCondition)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     termsConditions.find()
//     .then(termsCondition =>{
//         res.status(200).json(termsCondition);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT terms_condition.*, statusssss.status_name FROM terms_condition JOIN statusssss ON statusssss.status_id = terms_condition.status;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    termsConditions.findById(id)
    .then(termsCondition => {
        if (termsCondition) {
            res.status(200).json(termsCondition);
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
    termsConditions.remove(id)
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
    termsConditions.update(id, changes)
    .then(termsCondition => {
        if (termsCondition) {
            res.status(200).json(termsCondition)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find categoryModels by name 
router.get("/search/:title", (req, res) => {
    const {title} = req.params;
    termsConditions.findByName(title)
    .then(termsCondition => {
        if (termsCondition) {
            res.status(200).json(termsCondition);
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