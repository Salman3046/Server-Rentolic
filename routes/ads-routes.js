const express = require('express');
const ads = require('../models/dbAdsModel');

const router = express.Router();
var db = require('../database');
// posting data in to ads
router.post("/", (req, res) => {
    ads.add(req.body)
    .then(ad => {
        res.status(200).json(ad)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get ads from database
// router.get("/", (req, res) => {
//     ads.find()
//     .then(ad =>{
//         res.status(200).json(ad);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive ads !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT ads.*, statusssss.status_name FROM ads JOIN statusssss ON statusssss.status_id = ads.status;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});


// find ads by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    ads.findById(id)
    .then(ad => {
        if (ad) {
            res.status(200).json(ad);
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
    });
})


// delete ads by id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    ads.remove(id)
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

// update or edit ads
router.patch("/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body
    ads.update(id, changes)
    .then(ad => {
        if (ad) {
            res.status(200).json(ad)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find ads by name 
router.get("/search/:adName", (req, res) => {
    const {adName} = req.params;
    ads.findByName(adName)
    .then(ad => {
        if (ad) {
            res.status(200).json(ad);
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