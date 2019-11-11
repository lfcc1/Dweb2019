const express = require('express');
const router = express.Router();

var Premios = require('../controllers/premios')

/* GET: lista de premios */
router.get('/premios', function(req, res) {
    var categoria = req.query.categoria
    var data = req.query.data

    if(!categoria){
        Premios.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else{
      if(data){
          Premios.listarPremiosByCategoriaData(categoria,data)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      }
      else{
          Premios.listarPremiosByCategoria(categoria)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))

      }
    }

})

/* GET: recupera a informação de um premio */
router.get('/premios/:id', function(req, res) {
  Premios.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

/* GET: lista de categorias */
router.get('/categorias', function(req, res) {
  Premios.listarCategoria()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

/* GET: lista de laureados */
router.get('/laureados', function(req, res) {
  Premios.listarLaureados()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router