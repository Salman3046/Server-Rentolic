const express = require('express');
const privacyPolicys = require('../models/dbPrivacyPolicyModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    privacyPolicys.add(req.body)
    .then(privacyPolicy => {
        res.status(200).json(privacyPolicy)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     privacyPolicys.find()
//     .then(privacyPolicy =>{
//         res.status(200).json(privacyPolicy);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT privacy_policy.*, statusssss.status_name FROM privacy_policy JOIN statusssss ON statusssss.status_id = privacy_policy.status;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    privacyPolicys.findById(id)
    .then(privacyPolicy => {
        if (privacyPolicy) {
            res.status(200).json(privacyPolicy);
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
    privacyPolicys.remove(id)
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
    privacyPolicys.update(id, changes)
    .then(privacyPolicy => {
        if (privacyPolicy) {
            res.status(200).json(privacyPolicy)
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
    privacyPolicys.findByName(title)
    .then(privacyPolicy => {
        if (privacyPolicy) {
            res.status(200).json(privacyPolicy);
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