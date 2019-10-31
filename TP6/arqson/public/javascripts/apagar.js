function apagaMusica(ident){
    console.log("Vou tentar apagar o "+ident+" ....")
    axios.delete("/" + ident)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

function createMusica(){
    var musica = {};
    musica.prov = $('#pprov').val()
    musica.tit = $('#ptit').val()
    musica.local = $('#plocal').val()
    musica.inst = $('#pinst').val()
    musica.duracao = $('#pduracao').val()
    if(musica.prov == '' || musica.tit == '' || musica.local == ''){
        alert("Os campos Provincia, Local e Titulo são Obrigatorios!!")
        return
    }
    
    if(($('#pprof').val() != '') || ($('#pfrom').val() != '')){
        musica.musico = {}
        musica.musico.__text = $('#pmusico').val()
        musica.musico.from = $('#pfrom').val()
        musica.musico.prof = $('#pprof').val()
    }
    else
    musica.musico = $('#pmusico').val()

    if(($('#p_t').val() != '') || ($('#p__text').val() != '')){
        musica.file = {}
        musica.file._t = $('#p_t').val()
        musica.file.__text = $('#p__text').val()
    }
    musica.obs = {}
    musica.obs.file = []

    $('#pflist tr').each(function() {

        var values = [];
        $(this).find("input").each(function(){
            values.push(this.value);
        });
        var o = {}
        o._t =values[0]
        o.__text = values[1]
        musica.obs.file.push(o)
    });

    musica.obs.__text = $('#pobs').val()
    musica.obs.intxt = $('#pintxt').val()

    console.log("Vou tentar criar a Musica")
    console.log(musica)
    axios.post("/musica",musica)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

function updateMusica(){
    var musica = {};
    musica.prov = $('#iprov').val()
    musica.tit = $('#itit').val()
    musica.local = $('#ilocal').val()
    musica.inst = $('#iinst').val()
    musica.duracao = $('#iduracao').val()

    if(musica.prov == '' || musica.tit == '' || musica.local == ''){
        alert("Os campos Provincia, Local e Titulo são Obrigatorios!!")
        return
    }
    
    if(($('#iprof').val() != '') || ($('#ifrom').val() != '')){
        musica.musico = {}
        musica.musico.__text = $('#imusico').val()
        musica.musico.from = $('#ifrom').val()
        musica.musico.prof = $('#iprof').val()
    }
    else
    musica.musico = $('#imusico').val()

    if(($('#i_t').val() != '') || ($('#i__text').val() != '')){
        musica.file = {}
        musica.file._t = $('#i_t').val()
        musica.file.__text = $('#i__text').val()
    }

    musica.obs = {}
    musica.obs.file = []

    $('#flist tr').each(function() {

        var values = [];
        $(this).find("input").each(function(){
            values.push(this.value);
        });
        var o = {}
        o._t =values[0]
        o.__text = values[1]
        musica.obs.file.push(o)
    });

    musica.obs.__text = $('#iobs').val()
    musica.obs.intxt = $('#iintxt').val()

    index = $('#editIndex').val();
    console.log("Vou tentar atulizar a Musica "+index+" ....")
    console.log(musica)
    axios.put("/"+index,musica)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

function openEditModal(index){
    var musica = musicas[index]
    var tableBody = document.getElementById('flist');
  	
  	while (tableBody.childNodes.length) 
  		tableBody.removeChild(tableBody.childNodes[0]);

    $('#iprov').val(musica.prov)
    $('#itit').val(musica.tit)
    $('#ilocal').val(musica.local)
    $('#iinst').val(musica.inst)
    $('#imusico').val("")
    $('#iprof').val("")
    $('#iduracao').val("")
    $('#ifrom').val("")
    $('#iintxt').val("")
    $('#iobs').val("")
    if(musica.musico){
        
        if(musica.musico.__text)
            $('#imusico').val(musica.musico.__text)
        else 
            $('#imusico').val(musica.musico)

        if(musica.musico.from != undefined)
            $('#ifrom').val(musica.musico.from)
        if(musica.musico.prof != undefined)
            $('#iprof').val(musica.musico.from)
    }   

    $('#iduracao').val(musica.duracao)

    if(musica.file != undefined){
        $('#i_t').val(musica.file._t)
        $('#i__text').val(musica.file.__text)
    }
    if(musica.obs!= undefined){
        for(f in musica.obs.file){
            $('#flist').append("<tr><td><input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Formato' value ="+musica.obs.file[f]._t+">"+
                        "<input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Directoria' value ="+musica.obs.file[f].__text+"></td>"+
                        "<td><button class='w3-btn w3-blue-grey' onclick='removeFicheiro(this)'>Remover</button></td>"+
                       "</tr>")
        }
        $('#iintxt').val(musica.obs.intxt)
        $('#iobs').val(musica.obs.__text)
    }


    $('#editIndex').val(index)
    document.getElementById('modalEdit').style.display='block'
}

function openViewModal(musica){  
    console.log(musica)              
    $('#prov').html(musica.prov)
    $('#tit').html(musica.tit)
    $('#local').html(musica.local)
    
    if(musica.inst == undefined)
        $('#divInst').hide();
    else{
        $('#inst').html(musica.inst)
        $('#divInst').show();
    }
    
    if(musica.musico == undefined){
        $('#divMusico').hide();
    }
    else{
        $('#divMusico').show();
        if(musica.musico.__text == undefined){
            $('#musico').html(musica.musico)
        }
        else
            $('#musico').html(musica.musico.__text)
    
        if(musica.musico.prof == undefined)
            $('#profDiv').hide();
        else{ 
            $('#prof').html(musica.musico.prof)
            $('#profDiv').show();
        }

        if(musica.musico.from == undefined)
        $('#fromDiv').hide();
        else{
            $('#from').html(musica.musico.from)
            $('#fromDiv').show();
        }
    }

    if(musica.duracao != undefined){
        $('#duracaoDiv').show();
        $('#duracao').html(musica.duracao)
    }
    else 
        $('#duracaoDiv').hide();

    
    if(musica.file != undefined){
        $('#_t').html(musica.file._t)
        $('#__text').html(musica.file.__text)
        $('#ficheiroDiv').show();
    }
    else{
        $('#ficheiroDiv').hide();
    }
    $("#obsDiv").html("");

    if(musica.obs != undefined){
        $('#obsDiv').append("<h2>Observações </h2>")
        $('#obsDiv').show();
        for(f in musica.obs.file){
            var count = parseInt(f)+1;
            $('#obsDiv').append("<h4>Ficheiro "+count+":</h4>"+
                                "<label class ='w3-teal'><b>Formato</b></label></br>"+
                                "<label>"+musica.obs.file[f]._t+"</label></br>"+
                                "<label class ='w3-teal'><b>Diretoria</b></label></br>"+
                                "<label>"+musica.obs.file[f].__text+"</label></br>")
        }

        var aux;

        if(musica.obs.__text != undefined){
            aux = musica.obs.__text
        $('#obsDiv').append("<label class ='w3-teal'><b>Intxt</b></label></br>"+
            "<label>"+musica.obs.intxt+"</label></br>")
        }
        else aux = musica.obs

        $('#obsDiv').append("<label class ='w3-teal'><b>Obs:</b></label></br>"+
                            "<label>"+aux+"</label></br>")
            
    }
    else
    $('#obsDiv').hide();

    document.getElementById('modalView').style.display='block'
}

function addFicheiro(){
    $('#flist').append("<tr><td><input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Formato'>"+
                        "<input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Directoria'></td>"+
                        "<td><button class='w3-btn w3-blue-grey' onclick='removeFicheiro(this)'>Remover</button></td>"+
                       "</tr>")
}

function addFicheiroPost(){
    $('#pflist').append("<tr><td><input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Formato'>"+
                        "<input class ='w3-input w3-border w3-light-grey' type='text' placeholder='Directoria'></td>"+
                        "<td><button class='w3-btn w3-blue-grey' onclick='removeFicheiroPost(this)'>Remover</button></td>"+
                       "</tr>")
}

function removeFicheiro(elem){
    var index = $(elem).closest('td').parent()[0].sectionRowIndex;
	if (index > -1) {
        document.getElementById("flist").deleteRow(index);
	}
}

function removeFicheiroPost(elem){
    var index = $(elem).closest('td').parent()[0].sectionRowIndex;
	if (index > -1) {
        document.getElementById("pflist").deleteRow(index);
	}
}