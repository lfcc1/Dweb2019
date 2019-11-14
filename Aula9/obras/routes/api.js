const express = require('express');
const router = express.Router();

var Obras = require('../controllers/obras')

/* GET: lista de obras */
router.get('/obras', function(req, res) {
  var ano = req.query.ano
  var compositor = req.query.compositor
  var duracao = req.query.duracao
  var periodo = req.query.periodo

  if(ano){
      Obras.listarbyAno(ano)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
  else{
    if(compositor && duracao){
        Obras.listarByCompositorDuracao(compositor,duracao)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else{
      if(periodo){
        Obras.listarbyPeriodo(periodo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
      }
      else{
        Obras.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
      }

    }
  }

})

/* GET: recupera a informação de uma obra */
router.get('/obras/:id', function(req, res) {
  Obras.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

/* GET: lista de compositores */
router.get('/compositores', function(req, res) {
  Obras.listarCompositores()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

/* GET: lista de periodos */
router.get('/periodos', function(req, res) {
  Obras.listarPeriodos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router