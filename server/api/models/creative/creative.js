const mongoose = require('mongoose');


//new schema
const creativeSchema = new mongoose.Schema({
    user: [],
    products: [],
    media: [],
    creativeId: mongoose.Types.ObjectId()
});

module.exports = mongoose.model('Creative', creativeSchema);