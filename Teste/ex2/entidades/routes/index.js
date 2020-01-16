var express = require('express');
var router = express.Router();
var axios = require('axios')
var token = "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"
/* GET home page. */



router.get('/:id', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/'+req.params.id+token)
      .then(entidade => {
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/'+req.params.id+'/tipologias'+token)
          .then(tipologias => {
            axios.get('http://clav-api.dglab.gov.pt/api/entidades/'+req.params.id+'/intervencao/dono'+token)
              .then(donos => {
                axios.get('http://clav-api.dglab.gov.pt/api/entidades/'+req.params.id+'/intervencao/participante'+token)
                  .then(participantes => {
                    res.render('pag-entidade', { entidade:entidade.data, tipologias:tipologias.data, donos:donos.data, participantes:participantes.data });
                  })
                  .catch(erro => {
                    res.render('error', {error: erro})
                  })

              })
              .catch(erro => {
                res.render('error', {error: erro})
              })

          })
          .catch(erro => {
            res.render('error', {error: erro})
          })

      })
      .catch(erro => {
        res.render('error', {error: erro})
      })
});


router.get('/tipologias/:id', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias/'+req.params.id+token)
      .then(tipologia => {
        axios.get('http://clav-api.dglab.gov.pt/api/tipologias/'+req.params.id+'/elementos'+token)
          .then(entidades => {
            res.render('pag-tipologia', { tipologia: tipologia.data, entidades:entidades.data });
          })
          .catch(erro => {
            res.render('error', {error: erro})
          })
      })
      .catch(erro => {
        res.render('error', {error: erro})
      })
});

router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades'+token)
      .then(dados => {
        res.render('lista-entidades', { lista: dados.data });
      })
      .catch(erro => {
        res.render('error', {error: erro})
      })
});



module.exports = router;
