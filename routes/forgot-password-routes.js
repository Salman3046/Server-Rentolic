const express = require('express');
const login = require('../models/dbLoginApi');
const users = require('../models/dbUsersModel')
const bcrypt = require('bcrypt');

const router = express.Router();

// posting data in to categoryModels
router.post("/", (req, res) => {
    login.findById(req.body.phone)
        .then(log => {
            console.log(log)
            if (log === undefined) {
                return res.status(401).json({ msg: 'user not found' })
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return console.log(err)
                }
                else {
                    const user = ({
                        password: hash,
                        phone: req.body.phone
                    })
                    users.update(log.id, user)
                        .then(user => {
                            if (user) {
                                res.status(200).json({data:{message:"Password Update Successfully",row:user}})
                            } else {
                                res.status(404).json({ message: "Record not found" })
                            }
                        }).catch(error => {
                            res.status(500).json({ message: "Unable to update record" })
                            console.log(error)
                        })
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router;