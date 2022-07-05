const express = require('express');
const testimonials = require('../models/dbTestimonial');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    testimonials.add(req.body)
        .then(testimonial => {
            res.status(200).json(testimonial)
        })
        .catch(error => {
            res.status(500).json({ message: "Failed to Add !" })
        })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     testimonials.find()
//     .then(testimonial =>{
//         res.status(200).json(testimonial);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT testimonial.*, statusssss.status_name FROM testimonial JOIN statusssss WHERE statusssss.status_id = testimonial.is_featured;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    testimonials.findById(id)
        .then(testimonial => {
            if (testimonial) {
                res.status(200).json(testimonial);
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
    testimonials.remove(id)
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
    testimonials.update(id, changes)
        .then(testimonial => {
            if (testimonial) {
                res.status(200).json(testimonial)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        }).catch(error => {
            res.status(500).json({ message: "Unable to update record" })
            console.log(error)
        })
})

// find categoryModels by name 
router.get("/search/:username", (req, res) => {
    const { username } = req.params;
    testimonials.findByName(username)
        .then(testimonial => {
            if (testimonial) {
                res.status(200).json(testimonial);
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