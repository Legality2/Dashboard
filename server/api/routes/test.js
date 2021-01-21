var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const app = require('../../app');
const testCtrl = require("../controllers/testCtrl");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
};

app.get("/api/test/all", testCtrl.allAccess);

app.get("/api/test/user", testCtrl.userBoard);