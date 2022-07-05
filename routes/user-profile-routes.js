const express = require('express');
const userProfiles = require('../models/dbUserProfileModel');

const router = express.Router();

// posting data in to categoryModels
router.post("/", (req, res) => {
    userProfiles.add(req.body)
    .then(userProfile => {
        res.status(200).json(userProfile)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
    })
})

// get categoryModels from database
router.get("/", (req, res) => {
    userProfiles.find()
    .then(userProfile =>{
        res.status(200).json(userProfile);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive categoryModels !"})
    })
})

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    userProfiles.findById(id)
    .then(userProfile => {
        if (userProfile) {
            res.status(200).json(userProfile);
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
    userProfiles.remove(id)
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
    userProfiles.update(id, changes)
    .then(userProfile => {
        if (userProfile) {
            res.status(200).json(userProfile)
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
    userProfiles.findByName(user_id)
    .then(userProfile => {
        if (userProfile) {
            res.status(200).json(userProfile);
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