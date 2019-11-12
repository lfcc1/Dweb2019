const express = require('express');
const router = express.Router();

var Obras = require('../controllers/obras')

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