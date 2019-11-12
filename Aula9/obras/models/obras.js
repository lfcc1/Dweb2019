const mongoose = require('mongoose')

var ObrasSchema = new mongoose.Schema({
    nome: String,
    desc: String,
    anoCriacao: String,
    periodo: String,
    compositor: String,
    duracao: String,
    _id: {type: String, required: true}
  });

module.exports = mongoose.model('obras', ObrasSchema)
