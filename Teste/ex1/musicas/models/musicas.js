var mongoose = require('mongoose');
var Schema = mongoose.Schema


var PartituraSchema = new Schema({
  _type: String,
  _path: String
})

var InstrumentoSchema = new Schema({
    designacao: String,
    partitura: PartituraSchema,

})

var MusicaSchema = new Schema({
    _id: String,
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [InstrumentoSchema],
  });

module.exports = mongoose.model('musicas',MusicaSchema)