const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productCtrl = require('../../controllers/product/productCtrl');

//get all products
    router.get('/products', productCtrl.getProducts);

//post
    router.post('/products', productCtrl.addProduct);

//put

//delete


module.exports = router;