function deleteFilme(ident){
    console.log("Vou tentar apagar o "+ident+" ....")
    axios.delete("/filmes/" + ident)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}


function getTableInputValues(table){
    var values = [];
    console.log(table)
    $('#'+table+' tr').each(function() {
        console.log("FFF")
        values.push($(this).find("input").val())
    });
    return values;
}
function createFilme(){
    var filme = {};
    filme.title = $('#title').val()
    filme.year = $('#year').val()
    
    
    filme.cast = getTableInputValues('aTable')
    filme.genres = getTableInputValues('gTable')


    console.log("Vou tentar criar o Filme:")
    console.log(filme)
    axios.post("/filmes",filme)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}

function updateFilme(){
    var filme = {};
    filme.title = $('#ititle').val()
    filme.year = $('#iyear').val()

    if(filme.title == '' || filme.year == ''){
        alert("Os campos Titluo e Ano são Obrigatorios!!")
        return
    }

    filme.cast = getTableInputValues("aitable")
    filme.genres = getTableInputValues("gitable")
    filme._id = $('#editIndex').val()
    console.log("Vou tentar atulizar o Filme ...")
    console.log(filme)
    axios.put("/filmes/"+filme._id,filme)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}

function editFilme(index){
    var filme = filmes[index]
    var tableBody1 = document.getElementById('aitable');
    var tableBody2 = document.getElementById('gitable');
  	console.log(filme)
  	while (tableBody1.childNodes.length) 
        tableBody1.removeChild(tableBody1.childNodes[0]);
    while (tableBody2.childNodes.length) 
  		tableBody2.removeChild(tableBody2.childNodes[0]);

    $('#ititle').val(filme.title)
    $('#iyear').val(filme.year)
    $('#editIndex').val(filme._id)

        for(f in filme.cast){
            $('#aitable').append("<tr><td><input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Nome' value ="+filme.cast[f]+">"+
                        "<td><button class='w3-btn w3-blue-grey' onclick='removeTableRow(this,\"aitable\")'>Remover</button></td>"+
                       "</tr>")
        }

        for(f in filme.genres){
            $('#gitable').append("<tr><td><input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Género' value ="+filme.genres[f]+">"+
                        "<td><button class='w3-btn w3-blue-grey' onclick='removeTableRow(this,\"gitable\")'>Remover</button></td>"+
                       "</tr>")
        }

    document.getElementById('modalEdit').style.display='block'
}

function viewFilme(index){  
    var filme = filmes[index]
    console.log(filme)              
    $('#vtitle').html(filme.title)
    $('#vyear').html(filme.year)

    $("#vcastDiv").html("");
    $("#vgenresDiv").html("");
    for(f in filme.cast){
        $('#vcastDiv').append("<label>"+filme.cast[f]+"</label></br>")
    }
    for(f in filme.genres){
        $('#vgenresDiv').append("<label>"+filme.genres[f]+"</label></br>")
    }

    document.getElementById('modalView').style.display='block'
}

function addTableRow(table,holder){
    $('#'+table).append("<tr><td><input class ='w3-input w3-border w3-light-grey' type='text' placeholder='"+holder+"'>"+
                        "<td><button class='w3-btn w3-blue-grey' onclick='removeTableRow(this,\""+table+"\")'>Remover</button></td>"+
                       "</tr>")
}

function removeTableRow(elem,table){
    var index = $(elem).closest('td').parent()[0].sectionRowIndex;
	if (index > -1) {
        console.log(table)
        document.getElementById(table).deleteRow(index);
	}
}