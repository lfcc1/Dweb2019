var http = require('http');
var fs = require('fs')
var url = require('url')


function send_error(res,message){
        res.writeHead(200, {'Content-Type': 'text/html; charset =utf-8'})
        res.write("Algo correu mal, Erro: "+ message);
        res.end()
}

function writeContent(res,type,data){
    res.writeHead(200, {'Content-Type': type})
    res.write(data)
    res.end()
}

function handle_call(call,res){
    
    if(call ==  "arq2html.xsl"){

        fs.readFile('arq2html.xsl',function(err,data){
            if(err) 
                send_error(res,"Stylesheet arq2html.xsl nao foi encontrada no servidor.")
            else  
                writeContent(res,'text/xsl',data)
        })
    }
    else{

        fs.readFile('dataset/arq' + call +'.xml',function(err,data){
            if(err)
                send_error(res,"Finchero arq"+ call+ ".xml Inexistente.");
            else
                writeContent(res,'text/xml',data)
        })
    }

}


http.createServer(function (req, res) {
    var partes = req.url.split('/')
    var result = partes[partes.length-1];
    handle_call(result,res);
}).listen(7777)

console.log('servidor à escuta na porta 7777...')