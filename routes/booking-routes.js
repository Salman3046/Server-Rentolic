const express = require('express');
const bookings = require('../models/dbBookingModel');

const router = express.Router();

// posting data in to bookings
router.post("/", (req, res) => {
    bookings.add(req.body)
    .then(booking => {
        res.status(200).json(booking)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
    })
})

// get bookings from database
router.get("/", (req, res) => {
    bookings.find()
    .then(booking =>{
        res.status(200).json(booking);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive bookings !"})
    })
})

// find bookings by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    bookings.findById(id)
    .then(booking => {
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
    });
})


// delete bookings by id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    bookings.remove(id)
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

// update or edit bookings
router.patch("/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body
    bookings.update(id, changes)
    .then(booking => {
        if (booking) {
            res.status(200).json(booking)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find bookings by name 
router.get("/search/:user_id", (req, res) => {
    const {user_id} = req.params;
    bookings.findByName(user_id)
    .then(booking => {
        if (booking) {
            res.status(200).json(booking);
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