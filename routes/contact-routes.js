const express = require('express');
const contacts = require('../models/dbContactModel');

const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res) => {
    contacts.add(req.body)
    .then(contact => {
        res.status(200).json(contact)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to Add !"})
        console.log(error)
    })
})

// get categoryModels from database
router.get("/", (req, res) => {
    contacts.find()
    .then(contact =>{
        res.status(200).json(contact);
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrive categoryModels !"})
    })
})

// router.get('/', function (req, res, next) {
//     var sql = 'SELECT contact.*, statusssss.status_name FROM contact JOIN statusssss ON statusssss.status_id = contact.status;';
//     db.query(sql, function (err, data, fields) {
//         if (err) throw err;
//         res.json(data)
//     });
// });

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    contacts.findById(id)
    .then(contact => {
        if (contact) {
            res.status(200).json(contact);
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
    contacts.remove(id)
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
    contacts.update(id, changes)
    .then(contact => {
        if (contact) {
            res.status(200).json(contact)
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
    contacts.findByName(name)
    .then(contact => {
        if (contact) {
            res.status(200).json(contact);
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