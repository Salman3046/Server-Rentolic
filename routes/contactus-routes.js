const express = require('express');
const contactUss = require('../models/dbContactUsModel');

const router = express.Router();

// posting data in to categoryModels
router.post("/", (req, res) => {
    contactUss.add(req.body)
    .then(contactUs => {
        res.status(200).json(contactUs)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
router.get("/", (req, res) => {
    contactUss.find()
    .then(contactUs =>{
        res.status(200).json(contactUs);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive categoryModels !"})
    })
})

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    contactUss.findById(id)
    .then(contactUs => {
        if (contactUs) {
            res.status(200).json(contactUs);
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
    contactUss.remove(id)
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
    contactUss.update(id, changes)
    .then(contactUs => {
        if (contactUs) {
            res.status(200).json(contactUs)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find categoryModels by name 
router.get("/search/:address", (req, res) => {
    const {address} = req.params;
    contactUss.findByName(address)
    .then(contactUs => {
        if (contactUs) {
            res.status(200).json(contactUs);
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