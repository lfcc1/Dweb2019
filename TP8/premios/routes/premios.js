var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET Lista de premios. */
router.get('/', function(req, res, next) {
  var categoria = req.query.categoria
  var data = req.query.data
  if(!categoria){
    axios.get('http://localhost:3005/api/premios')
      .then(dados => {
        res.render('lista-premios', { lista: dados.data });
      })
      .catch(erro => {
        res.render('error', {error: erro})
      })
    }
    else{
      if(data){
        axios.get('http://localhost:3005/api/premios?categoria='+categoria+'&data='+data)
        .then(dados => {
          res.render('lista-premios', { lista: dados.data });
        })
        .catch(erro => {
          res.render('error', {error: erro})
        })
      }
      else{
        axios.get('http://localhost:3005/api/premios?categoria='+categoria)
        .then(dados => {
          res.render('lista-premios', { lista: dados.data });
        })
        .catch(erro => {
          res.render('error', {error: erro})
        })
    }
  }
})

/* GET Lista de categorias. */
router.get('/categorias', function(req, res, next) {
  axios.get('http://localhost:3005/api/categorias')
    .then(dados => {
      res.render('lista-categorias', { lista: dados.data });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

/* GET Lista de laureados. */
router.get('/laureados', function(req, res, next) {
  axios.get('http://localhost:3005/api/laureados')
    .then(dados => {
      res.render('lista-laureados', { lista: dados.data });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

// GET Recupera a informação de um premio
router.get('/:id', function(req,res){
  axios.get('http://localhost:3005/api/premios/' + req.params.id)
    .then(dados => {
      res.render('pag-premio', { a: dados.data });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})





module.exports = router;
