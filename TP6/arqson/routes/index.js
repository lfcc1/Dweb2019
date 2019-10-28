var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var myBD = __dirname + "/../arqson.json"
console.log(myBD)
/* GET home page. */
router.get('/', function(req, res, next) {
    jsonfile.readFile(myBD, (erro, musicas)=>{
    if(!erro){
      console.log(musicas.length)
      res.render('index',{lista:musicas})
    }
    else{
      res.render('error', {error:erro})
    }
    })
})

router.post('/', function(req, res) {
jsonfile.readFile(myBD, (erro, musicas)=>{
  if(!erro){
    musicas.unshift(req.body)
        jsonfile.writeFile(myBD, musicas, erro => {
          if(erro) console.log(erro)
          else console.log('Registo gravado com sucesso.')
      })
    }
})
res.redirect('/')
})

router.put('/:index', function(req, res) {
  jsonfile.readFile(myBD, (erro, musicas)=>{
    if(!erro){
      console.log(req.body)
      var index = req.params.index
      musicas[index] = req.body
      jsonfile.writeFile(myBD, musicas, erro => {
        if(erro) console.log(erro)
        else console.log('Registo gravado com sucesso.')
    })
      }
  })
  //res.redirect('/')
  })


router.delete('/:index', function(req, res) {
  jsonfile.readFile(myBD, (erro, alunos)=>{
    if(!erro){
        var index = req.params.index
        if(index > -1){
            alunos.splice(index, 1)
            jsonfile.writeFile(myBD, alunos, erro => {
                if(erro) console.log(erro)
                else console.log('BD atualizada com sucesso.')
            })
            res.end('0')
        }
        else {
            console.log('Erro: não consegui encontrar o elemento a remover...')
            res.end('1')
        }
    }
    else{
        console.log('Erro na leitura da BD...')
        res.end('1')
    }
})
})

app.get('*', function(req, res){
  res.render('error', {error:erro})
});

module.exports = router;
