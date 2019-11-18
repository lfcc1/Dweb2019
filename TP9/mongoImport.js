var GenerateSchema = require('generate-schema')
var jsonfile = require('jsonfile')
var mongoose = require('mongoose')
var path = require('path')

var args = process.argv.slice(2)

mongoImport();


function mongoImport(){
    //se o comando esta bem construido
    if(args[0] == '--db' && args[2] == "--collection" && args[4] == '--file'){
        var dbName = args[1]
        var collectionName = args[3]
        var fileName = args[5]

        //se o ficheiro input é um ficheiro com formato JSON
        if(path.extname(fileName)!='.json'){
            console.log("O ficheiro a carregar tem de estar em formato JSON!")
            return;
        }
    
        jsonfile.readFile(fileName,function(err,data){
            if(err) 
                console.log("O ficheiro "+ fileName+" nao foi encontrado.")
            else {
                // nome da collection sempre no plural
                if(collectionName[collectionName.length-1] != 's')
                    collectionName += 's'

                console.log('DataBase: ' + dbName)
                console.log('Collection: ' + collectionName )
                console.log('JsonFile: ' + fileName)

                createDatabase(dbName,collectionName, data);
            }
    
        })
    }
    else 
        console.log('Command Usage: mongoimport  --db dbName --collection collectionName --file fileName.json --jsonArray \n')
}



function createDatabase(dbName,collectionName, data){
            
    //Conexão ao mongo
    mongoose.connect('mongodb://127.0.0.1:27017/'+dbName, {useNewUrlParser: true,  useUnifiedTopology: true })
            .then(()=> {console.log('Mongo ready: ' + mongoose.connection.readyState); })
            .catch((erro)=> console.log('Mongo - erro na conexão: ' + erro ))
            
    // criação do schema
    var generatedSchema = GenerateSchema.json('standard', data);
    console.log("Schema Gerado:")
    console.log(generatedSchema.items.properties);
    var schema = new mongoose.Schema(generatedSchema.items.properties);
    
    //criação do model
    var model = mongoose.model(collectionName, schema);
    
    //inserçao dos dados na BD
    model.insertMany(data)
        .then(()=> {console.log("Elementos inseridos na base de dados: "+dbName); mongoose.disconnect()})
        .catch((erro)=> console.log('Mongo - erro na conexão: ' + erro ))
            
}