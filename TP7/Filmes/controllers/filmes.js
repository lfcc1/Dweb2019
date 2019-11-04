var Filme = require('../models/filme')

const Filmes = module.exports

Filmes.listar = () =>{
    return Filme
        .find({})
        .sort({title: 1})
        .exec()
}

Filmes.consultar = fid =>{
    return Filme
        .findOne({_id:fid})
        .exec()
}

Filmes.contar = () =>
{
    return Filme
    .countDocuments()
    .exec()
}

Filmes.delete = id =>
{
    console.log(id)
    Filme.deleteOne({_id:id}, function (err) {
        if(err) 
            console.error(err)
        else
            console.log("Filme apagado com sucesso!") 

    })
}

Filmes.update = (id, newf) => {

    Filme.updateOne({_id: id}, {$set: newf}, (err, filme) =>{
        if (err) 
            return console.error(err);
        else
            console.log(id + 'atualizado com sucesso.')
    })
}

Filmes.inserir = f =>
{
   
    var movie = new Filme(f);
    console.log(movie);

    movie.save(function (err, filme) {
        if (err) return console.error(err);
        else
        console.log(filme.title + ' foi gravado com sucesso.')
    })
}

Filmes.projectar = camps =>{
    return Filme
    .find({}, campos)
    .exec()
}

Filmes.agregar  = campo =>{
    return Filme
        .aggregate([{$group: {_id:"$" + campo, contador: {$sum: 1}}}])
}