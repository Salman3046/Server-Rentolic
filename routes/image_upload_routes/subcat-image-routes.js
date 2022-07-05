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
const tripTypes = upload.fields([{ name: 'sub_cat_image', maxCount: 10 }, { name: 'sub_cat_icon', maxCount: 10 }])

router.post("/", tripTypes, function (req, res, next) {
    
    console.log(req.files);
    
    return res.json({
        success: 1, 
         active_url: `/image/${req.files.sub_cat_image[0].filename}`,
         inactive_url: `/image/${req.files.sub_cat_icon[0].filename}`,
    })
})


module.exports = router;