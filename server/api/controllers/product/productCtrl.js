const mongoose = require("mongoose");
const productModal = require('../../models/products/product');
const productCtrl = {};

productCtrl.addProduct = async (req, res, next) => {
    try {
        var newProd = new productModal({})
            newProd.name = req.body.name;
            newProd.price = req.body.price;
            newProd.specs.description = req.body.description;
            newProd.specs.inStock = req.body.inStock;

        newProd.save((err) => {
            if(err){
                res.json(err);
            } else {
                res.json({msg: "product was added to db"})
            }
        })
    } catch (e){
        console.log(e);
        next();
    }

};
productCtrl.getProducts = async (req, res, next) => {
    productModal.find({}, (err, prod) => {
        res.json(prod);
    })
};




module.exports = productCtrl;