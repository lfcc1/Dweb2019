var Obra = require('../models/obras')
// Devolve a lista de obras
module.exports.listar = () => {
    return Obra
        .find()
        .exec()
}

// Devolve a informação de um obra
module.exports.consultar = id => {
    return Obra
        .find({_id:id})
        .exec()
}

// Devolve lista de compositores
module.exports.listarCompositores = () => {
    return Obra
        .aggregate([{$group:{_id:"$compositor"}}]) 
        .exec()
}

// Listar os periodos
module.exports.listarPeriodos = () => {
    return Obra
        .aggregate([{$group:{_id:"$periodo"}}]) 
        .exec()
}
// Listar as obras pelo ano
module.exports.listarbyAno = ano => {
    return Obra
        .find({anoCriacao:ano})
        .exec()
}

// devolve as obras de um dado compositor que tenham duracao superior a uma dada duracao
module.exports.listarByCompositorDuracao = (comp, dur) => {
    return Obra
        .find({$and:[{compositor:comp}, {duracao:{$gt:dur}}]}) 
        .exec()
}

// listar obras por periodos
module.exports.listarbyPeriodo = p => {
    return Obra
        .find({periodo:p})
        .exec()
}