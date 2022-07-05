const express = require('express');
const blogs = require('../models/dbBlogModel');

const router = express.Router();
var db = require('../database');
// posting data in to blogs
router.post("/", (req, res) => {
    blogs.add(req.body)
    .then(blog => {
        res.status(200).json(blog)
    })
    .catch(error => {
        res.status(500).json({message: "Failed to blogd !"})
        // console.log(error)
    })
})

// get blogs from database
// router.get("/", (req, res) => {
//     blogs.find()
//     .then(blog =>{
//         res.status(200).json(blog);
//     })
//     .catch(error => {
//         res.status(500).json({ message: "Unable to retrive blogs !"})
//     })
// })

router.get('/', function (req, res, next) {
    var sql = 'SELECT blogs.*, statusssss.status_name FROM blogs JOIN statusssss ON blogs.status = statusssss.status_id;';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data)
    });
});

// find blogs by id 
router.get("/:id", (req, res) => {
    const {id} = req.params;
    blogs.findById(id)
    .then(blog => {
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "Record not found"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to Perform Action"})
    });
})


// delete blogs by id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    blogs.remove(id)
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

// update or edit blogs
router.patch("/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body
    blogs.update(id, changes)
    .then(blog => {
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).json({message: "Record not found" })
        }
    }).catch(error => {
        res.status(500).json({message: "Unable to update record"})
        console.log(error)
    })
})

// find blogs by name 
router.get("/search/:name", (req, res) => {
    const {name} = req.params;
    blogs.findByName(name)
    .then(blog => {
        if (blog) {
            res.status(200).json(blog);
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