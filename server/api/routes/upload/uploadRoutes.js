const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const DIR = '../../../../../public';
const userModal = require('../../models/user-model');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



router.post('/profile', upload.single('File'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const userId = req.body.id;
 
    userModal.findByIdAndUpdate({_id: userId}, {profileImg: req.file.path}, function(err, result){
        if(err) {
            console.log(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
   
   
    
});

router.get("/test", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});

module.exports = router;