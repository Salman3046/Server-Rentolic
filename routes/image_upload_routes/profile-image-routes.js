const express = require('express');
const path = require("path");

const multer = require("multer");
// storage engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}) 

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000,
    }
})
const router = express.Router();
router.post("/", upload.single("profile"), (req, res) => {
    // console.log(req.file);
    return res.json({
        success: 1,
        image: `/image/${req.file.filename}`,
    })
})

module.exports = router;