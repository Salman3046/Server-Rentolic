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
  { name: 'image', maxCount: 10 },
  // { name: 'icon', maxCount: 10 },
  // icon
  { name: 'icon1', maxCount: 10 },
  { name: 'icon2', maxCount: 10 },
  { name: 'icon3', maxCount: 10 },
  { name: 'icon4', maxCount: 10 },
  { name: 'icon5', maxCount: 10 },
])

router.post("/", tripTypes, function (req, res, next) {
  return res.json({
    success: 1,
    active_url: `/image/${req.files.image[0].filename}`,
    // inactive_url: `/image/${req.files.icon[0].filename}`,
    //  ICON
    iconClass1: `/image/${req.files.icon1[0].filename}`,
    iconClass2: `/image/${req.files.icon2[0].filename}`,
    iconClass3: `/image/${req.files.icon3[0].filename}`,
    iconClass4: `/image/${req.files.icon4[0].filename}`,
    iconClass5: `/image/${req.files.icon5[0].filename}`,
  })
})


module.exports = router;