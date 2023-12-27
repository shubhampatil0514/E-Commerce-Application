const express = require('express');
const imageController= require('../controllers/imageController')
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

  router.post('/upload', upload.single('img'), imageController.uploadImage);
  
  module.exports = router;