const express = require('express');
const userComplaints = require('../models/dbUserComplaintModel');

const router = express.Router();

// posting data in to categoryModels
router.post("/", (req, res) => {
    userComplaints.add(req.body)
    .then(userComplaint => {
        res.status(200).json(userComplaint)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
    })
})

// get categoryModels from database
router.get("/", (req, res) => {
    userComplaints.find()
    .then(userComplaint =>{
        res.status(200).json(userComplaint);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive categoryModels !"})
    })
})

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    userComplaints.findById(id)
    .then(userComplaint => {
        if (userComplaint) {
            res.status(200).json(userComplaint);
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
    userComplaints.remove(id)
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
    userComplaints.update(id, changes)
    .then(userComplaint => {
        if (userComplaint) {
            res.status(200).json(userComplaint)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find categoryModels by name 
router.get("/search/:user_id", (req, res) => {
    const {user_id} = req.params;
    userComplaints.findByName(user_id)
    .then(userComplaint => {
        if (userComplaint) {
            res.status(200).json(userComplaint);
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