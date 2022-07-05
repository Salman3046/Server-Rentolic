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
const tripTypes = upload.fields([{ name: 'image', maxCount: 10 }, { name: 'image2', maxCount: 10 }])

router.post("/", tripTypes, function (req, res, next) {

    console.log(req.files);

    return res.json({
        success: 1,
        image: `/image/${req.files.image[0].filename}`,
        image2: `/image/${req.files.image2[0].filename}`,
    })
})


module.exports = router;