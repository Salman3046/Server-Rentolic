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
const tripTypes = upload.fields([
    { name: 'images', maxCount: 10 }, 
    { name: 'minImage1', maxCount: 10 },
    { name: 'minImage2', maxCount: 10 },
    { name: 'minImage3', maxCount: 10 },
    { name: 'minImage4', maxCount: 10 },
])

router.post("/", tripTypes, function (req, res, next) {
    return res.json({
        success: 1, 
         image: `/image/${req.files.images[0].filename}`,
         image1: `/image/${req.files.minImage1[0].filename}`,
         image2: `/image/${req.files.minImage2[0].filename}`,
         image3: `/image/${req.files.minImage3[0].filename}`,
         image4: `/image/${req.files.minImage4[0].filename}`
    })
})


module.exports = router;