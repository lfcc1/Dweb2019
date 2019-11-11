const mongoose = require('mongoose')

var laureateSchema = new mongoose.Schema({
    id: Number,
    firstname: String,
    surname: String,
    motivation: String,
    shate: Number

})

var premioSchema = new mongoose.Schema({
    _id: String,
    year: Number,
    category: String,
    overallMotivation: String,
    laureates: [laureateSchema]
  });

module.exports = mongoose.model('premios', premioSchema)
