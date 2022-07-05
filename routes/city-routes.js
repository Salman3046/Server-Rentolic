const express = require('express');
const citys = require('../models/dbCityModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    citys.add(req.body)
    .then(city => {
        res.status(200).json(city)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     citys.find()
//     .then(city =>{
//         res.status(200).json(city);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT city.*, statusssss.status_name FROM city JOIN statusssss WHERE statusssss.status_id = city.status AND city.pending_status = 1;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    citys.findById(id)
    .then(city => {
        if (city) {
            res.status(200).json(city);
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
    citys.remove(id)
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
    citys.update(id, changes)
    .then(city => {
        if (city) {
            res.status(200).json(city)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find categoryModels by name 
router.get("/search/:name", (req, res) => {
    const {name} = req.params;
    citys.findByName(name)
    .then(city => {
        if (city) {
            res.status(200).json(city);
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