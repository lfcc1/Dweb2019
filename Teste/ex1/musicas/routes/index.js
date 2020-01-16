var express = require('express');
var router = express.Router();
var Musicas = require('../controllers/musicas')

router.get('/tipos', function(req, res, next) {
  
  Musicas.agregarTipos()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
  
});


router.get('/obras/:id', function(req, res, next) {
  
  Musicas.consultar(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
  
});

router.get('/obrasQuant', function(req, res, next) {
  
  Musicas.musicasQuant()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
  
});




/* GET home page. */
router.get('/obras', function(req, res, next) {
  if(req.query.compositor){
    Musicas.MusicasByCompositor(req.query.compositor)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }

  else if(req.query.instrumento){
    Musicas.containsInstrumento(req.query.instrumento)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else{
    Musicas.projectar({"_id":true,"titulo":true,"tipo":true,"compositor":true})
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }
  
});

module.exports = router;
