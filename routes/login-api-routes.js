const express = require('express');
const login = require('../models/dbLoginApi');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');

const router = express.Router();

// posting data in to categoryModels
router.post("/", (req, res,next) => {
     login.findById(req.body.phone)
    .then(log => {
        console.log(log)
        if(log===undefined)
        {
            return res.status(401).json({msg:'user not found'})
        }
        bcrypt.compare(req.body.password,log.password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({msg:"Invalid Login Credential"})
            }
            if(result)
            {
                const token=jwt.sign({
                    id:log.id,
                    fullName:log.fullName,
                    email:log.email,
                    phone:log.phone,
                },"Hello Lender",{
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    id:log.id,
                    fullName:log.fullName,
                    email:log.email,
                    phone:log.phone,
                    token:token
                })
            }
        })
    })
    .catch(error => {
        console.log(error)
    })
})

// get categoryModels from database
// router.get("/get", (req, res) => {
//     login.find()
//     .then(log =>{
//         res.status(200).json(log);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive categoryModels !"})
//     })
// })

// find categoryModels by id 
router.get("/:lender_email", (req, res) => {
    const {lender_email} = req.params;
    login.findById(lender_email)
    .then(log => {
        if (log) {
            res.status(200).json(log);
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
    });
})

module.exports = router;