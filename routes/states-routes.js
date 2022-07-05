const express = require('express');
const states = require('../models/dbStatesModel');

const router = express.Router();

// posting data in to categoryModels
router.post("/", (req, res) => {
    states.add(req.body)
    .then(state => {
        res.status(200).json(state)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
router.get("/", (req, res) => {
    states.find()
    .then(state =>{
        res.status(200).json(state);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive categoryModels !"})
    })
})

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    states.findById(id)
    .then(state => {
        if (state) {
            res.status(200).json(state);
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
    states.remove(id)
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
    states.update(id, changes)
    .then(state => {
        if (state) {
            res.status(200).json(state)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find categoryModels by name 
router.get("/search/:state_name", (req, res) => {
    const {state_name} = req.params;
    states.findByName(state_name)
    .then(state => {
        if (state) {
            res.status(200).json(state);
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