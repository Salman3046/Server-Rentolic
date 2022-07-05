const express = require('express');
const abouts = require('../models/dbAboutModel');

const router = express.Router();

// posting data in to abouts
router.post("/", (req, res) => {
    abouts.add(req.body)
    .then(about => {
        res.status(200).json(about)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
    })
})

// get abouts from database
router.get("/", (req, res) => {
    abouts.find()
    .then(about =>{
        res.status(200).json(about);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive abouts !"})
    })
})

// find abouts by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    abouts.findById(id)
    .then(about => {
        if (about) {
            res.status(200).json(about);
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
    });
})


// delete abouts by id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    abouts.remove(id)
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

// update or edit abouts
router.patch("/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body
    abouts.update(id, changes)
    .then(about => {
        if (about) {
            res.status(200).json(about)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find abouts by name 
router.get("/search/:about_us", (req, res) => {
    const {about_us} = req.params;
    abouts.findByName(about_us)
    .then(about => {
        if (about) {
            res.status(200).json(about);
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