var Premio = require('../models/premios')
var ObjectId = require('mongodb').ObjectID
// Devolve a lista de premios
module.exports.listar = () => {
    return Premio
        .aggregate([{$project: {year: true, category:true}},{$sort: {year:-1}}])
        .exec()
}

// Devolve a informação de um premio
module.exports.consultar = id => {
    return Premio
        .findOne(ObjectId(id))
        .exec()
}

// Devolve lista de categorias
module.exports.listarCategoria = () => {
    return Premio
        .aggregate([{$group:{_id:"$category"}}]) 
        .exec()
}
// Devolve os premios de uma dada categoria
module.exports.listarPremiosByCategoria = categoria => {
    return Premio
        .aggregate([{$match:{category:categoria}}])
        .exec()
}
// devolve os premios de uma dada categoria que tenham data superior a uma dada data
module.exports.listarPremiosByCategoriaData = (categoria, data) => {
    return Premio
        .aggregate([{$match:{category:categoria, year:{$gt:data}}}]) 
        .exec()
}
// Devolve uma lista ordenada alfabeticamente por nome dos laureados com os campos correspondentes ao nome, ano do prémio e categoria.
module.exports.listarLaureados = () => {
    return Premio
        .aggregate([{$unwind:"$laureates"},{$sort:{"laureates.firstname":1,"laureates.surname":1}},{$project:{"laureates.firstname":true,"laureates.surname": true,year:true,category:true, _id: false}}])
        .exec()
}
