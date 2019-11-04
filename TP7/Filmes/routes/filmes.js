var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes.js')

/* GET home page. */


router.get('/', function(req, res) {
  Filmes.listar()
    .then(dados => res.render("index",{lista:dados}))//res.render template associada aos dados)
    .catch(erro => res.status(500).render("error",erro))
});

router.get('/:idFilme',function(req,res){
  Filmes.consultar(req.params.idFilme)
  .then(dados => {console.log(dados); 
    res.render("filme",{filme:dados});})
  .catch(erro => res.status(500).render("error",erro))
})

router.delete('/:idFilme',function(req,res){
  Filmes.delete(req.params.idFilme)
  res.end('0')
})

router.post('/',function(req,res){
  Filmes.inserir(req.body)
  res.end();
})

router.put('/:idFilme',function(req,res){
  Filmes.update(req.params.idFilme,req.body)
  res.end();
})


module.exports = router;
