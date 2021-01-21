const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    ticket: String,
    location: String,
    jobDescription: String,
    color: String,
    start: String,
    end: String
});


module.exports = mongoose.model('eventSchema', eventSchema);