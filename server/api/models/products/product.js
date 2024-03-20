const mongoose = require("mongoose");

//product schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    specs: {
        img:{

        },
        description: String,
        inStock: Number,
        sizes: {
            s: Number,
            m: Number,
            l: Number,
            xl: Number
        }
    }
});

module.exports = mongoose.model('Products', productSchema);