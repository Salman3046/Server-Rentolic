const express = require('express');
const users = require('../models/dbUsersModel');
const bcrypt = require('bcrypt');


const router = express.Router();
var db = require('../database');
// posting data in to categoryModels
router.post("/", (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return console.log(err)
        }
        else {
            const user = ({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash,
                phone: req.body.phone
            })

            users.add(user)
                .then(user => {
                    res.status(200).json(user)
                })
                .catch(error => {
                    res.status(500).json({ message: "Failed to Add !" })
                })
        }
    })
})

// get categoryModels from database
// router.get("/", (req, res) => {
//     users.find()
//     .then(user =>{
//         res.status(200).json(user);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

// find categoryModels by id 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    users.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
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
    users.remove(id)
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
    users.update(id, changes)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "Record not found" })
            }
        }).catch(error => {
            res.status(500).json({ message: "Unable to update record" })
            console.log(error)
        })
})

// find categoryModels by name 
router.get("/search/:name", (req, res) => {
    const { name } = req.params;
    users.findByName(name)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send({ message: "Record not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to Perform Action" })
            console.log(error);
        });
})

router.get('/', function (req, res, next) {
    var sql = 'SELECT users.*, statusssss.status_name FROM users JOIN statusssss WHERE statusssss.status_id = users.status;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});
module.exports = router;