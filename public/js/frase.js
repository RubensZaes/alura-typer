$('#botao-frase').click(fraseAleatoria)

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