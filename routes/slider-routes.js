const express = require('express');
const sliders = require('../models/dbSlider');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    sliders.add(req.body)
    .then(slider => {
        res.status(200).json(slider)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     sliders.find()
//     .then(slider =>{
//         res.status(200).json(slider);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT slider.*, statusssss.status_name FROM slider JOIN statusssss ON statusssss.status_id = slider.status;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    sliders.findById(id)
    .then(slider => {
        if (slider) {
            res.status(200).json(slider);
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
    sliders.remove(id)
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
    sliders.update(id, changes)
    .then(slider => {
        if (slider) {
            res.status(200).json(slider)
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
    sliders.findByName(title)
    .then(slider => {
        if (slider) {
            res.status(200).json(slider);
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