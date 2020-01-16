var Musica = require('../models/musicas')

const Musicas = module.exports

Musicas.listar = () =>{
    return Musica
        .find()
        .exec()
}

Musicas.consultar = id =>{
    return Musica
        .findOne({_id:id})
        .exec()
}


Musicas.projectar = campos =>{
    return Musica
    .find({}, campos)
    .exec()
}

Musicas.agregarTipos  = () =>{
    return Musica
        //.aggregate([{$group:{_id:"$tipo"}}])
        .distinct("tipo")
        .exec()
}


Musicas.MusicasByCompositor = compositor =>{
    return Musica
        .find({compositor:compositor})
        .exec()
}


Musicas.containsInstrumento = instrumento =>{
    return Musica
        .find({"instrumentos.instrumento.designacao": {$in:[instrumento]}})
        .exec()
}

//{$group:{_id: "$cast",counts:{$sum:1}}}

Musicas.musicasQuant = () =>{
    return Musica
    .aggregate([
        {$project: {_id:true,titulo:true,partituras: { $cond: { if: { $isArray: "$instrumentos.instrumento" }, then: { $size: "$instrumentos.instrumento" }, else: {$cond: { if: { "instrumentos": {exists:true}}, then: 1, else: 0} }}}}}] )
        .exec()
}