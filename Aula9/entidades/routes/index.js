var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
  .then(dados => {
    res.render('index', { lista: dados.data });
  })
  .catch(erro => {
    res.render('error', {error: erro})
  })
});

router.get('/:id', function(req,res) {  
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
  .then(dados => {
    var entidade = dados.data
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias' + '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
      .then(dados => {
        var tipologias = dados.data
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id  + '/intervencao' + '/dono' + '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
         .then(dados => {
            var donos = dados.data
            axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id  + '/intervencao' + '/participante' + '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
              .then(dados => {
                res.render('entidade', {e : entidade, t : tipologias, d : donos, p : dados.data})          
              })
             .catch(erro => {
                res.render('error', {error: erro})
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
})


module.exports = router;
