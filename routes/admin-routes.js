const express = require('express');
const admins = require('../models/dbAdminModel');

const router = express.Router();

// posting data in to admins
router.post("/", (req, res) => {
    admins.add(req.body)
    .then(admin => {
        res.status(200).json(admin)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
    })
})

// get admins from database
router.get("/", (req, res) => {
    admins.find()
    .then(admin =>{
        res.status(200).json(admin);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive admins !"})
    })
})

// find admins by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    admins.findById(id)
    .then(admin => {
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
    });
})


// delete admins by id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    admins.remove(id)
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

// update or edit admins
router.patch("/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body
    admins.update(id, changes)
    .then(admin => {
        if (admin) {
            res.status(200).json(admin)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find admins by name 
router.get("/search/:admin_name", (req, res) => {
    const {admin_name} = req.params;
    admins.findByName(admin_name)
    .then(admin => {
        if (admin) {
            res.status(200).json(admin);
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