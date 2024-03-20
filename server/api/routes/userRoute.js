var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var usrCtrl = require('../controllers/userCtrl.js');

var config = require('../../config/config.js');

router.param('id', function(req, res, next, id){
    req.id = req.params.id;
    console.log(req.id);
    next();
  });

//get all users

router.get('/users', function(req, res){
    usrCtrl.getAllUsers(res);
});

router.get('/user/:id', function(req, res){
    usrCtrl.getSingleUser(req, res);
});
//update user
router.put('/user/:id', function(req, res){
    usrCtrl.updateUser(req, res);
});

//get channels for users membership
router.get('/user/:id/channel', function(req, res){
    usrCtrl.userChannels(req, res);
});

//get groups belonging to user
router.put('/user/:userId/group', function(req, res){
    
});
//new user
//new user
router.post('/user', function(req, res, next){
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    
    console.log(newUser);
    

        newUser.save(function(err){
            if(err){
                console.log(err);
                next();
            } else {
                console.log('new user has signed up');
                res.json({msg: "you successfully created an account!"});
            }
        });
});



//remove user
router.delete('/user/:id', function(req, res){
    usrCtrl.removeUser(req, res);
});

//get user channel by puchasedMembership




module.exports = router;