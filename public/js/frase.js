$('#botao-frase').click(fraseAleatoria)
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria() {
    $('#spinner').show();

    $.get('http://localhost:3000/frases', trocaFraseAleatoria)
    .fail(function(){
        $('#erro').show();
        setInterval(function () {
            $('#erro').hide();
        }, 2500)        
    })
    .always(function(){
        $('#spinner').hide();
    })
}

function trocaFraseAleatoria(data){
    let frase = $('.frase')
    let numAleatorio = Math.floor(Math.random() * data.length)
    frase.text(data[numAleatorio].texto)

    atualizaTamanhoFrase()
    atualizaTempoInicial(data[numAleatorio].tempo)
}

function buscaFrase(){
    $('#spinner').show();

    let fraseId = $('#frase-id').val()
    let dados = {id: fraseId}

    $.get('http://localhost:3000/frases', dados, trocaFrases)
    .fail(function(){
        $('#erro').show();
        setInterval(function () {
            $('#erro').hide();
        }, 2500)        
    })
    .always(function(){
        $('#spinner').hide();
    })
}

function trocaFrases(data) {
    let frase = $('.frase')
    frase.text(data.texto)
    atualizaTamanhoFrase()
    atualizaTempoInicial(data.tempo)
}