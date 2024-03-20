var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var path = require('path');
var mongoose = require('mongoose');
var main = require('../../app.js');
var connection = main.db;
var multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
// Create a storage object with a given configuration
const url = 'mongodb://127.0.0.1:27017/nsPlatform';
const fileModel = require('../models/file/file-model.js');
const userModal = require('../models/user-model');
const createReadStream = require('fs');
   
// or create custom bucket with custom options


const storage = multer.diskStorage({
  destination: '../../files',
   filename: function (req, file, cb) {
     console.log(file);
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))

    });
  }
});
const upload = multer({storage});
router.get('/files', function(req, res){
    fileModel.find({}, function(err, f){
        if(err){ res.json(err)}
        else {
            res.json(f);
        }
    });
});

router.post('/files', upload.single('upl'), (req, res, next) => { 
  const userId = req.body.id;

  console.log(req.file);
  userModal.findByIdAndUpdate({_id: userId}, {profileImg: req.file.filename}, function(err, result){
    if(err) {
        console.log(err);
    } else {
        console.log(result);
        res.json(result);
    }
});
  });

  module.exports = router;