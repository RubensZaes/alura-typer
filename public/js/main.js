let tempoInicial = $('#tempo-digitacao').text()
let campo = $('.campo-digitacao')
/*
$(document).ready(function(){
    atualizaTamanhoFrase()
    inicializaContadores()
    inicializaCronometro()
    $('#botao-reiniciar').click(reiniciaJogo)
})
*/
$(function(){
    atualizaTamanhoFrase()
    inicializaContadores()
    inicializaCronometro()
    inicializaMarcadores()
    $('#botao-reiniciar').click(reiniciaJogo)
})

function atualizaTamanhoFrase(){
    let frase = $('.frase').text()
    let numPalavras = frase.split(' ').length
    let tamanhoFrase = $('#tamanho-frase')
    tamanhoFrase.text(numPalavras)
}

function inicializaContadores(){
    campo.on('input', function(){
        let conteudo = campo.val()
        let qntPalavras = conteudo.split(/\S+/).length - 1
        $('#contador-palavras').text(qntPalavras)
    
        let qntCaracteres = conteudo.length
        $('#contador-caracteres').text(qntCaracteres)
    })
}

function inicializaCronometro(){  
    let tempoRestante = $('#tempo-digitacao').text()  
    campo.one('focus', function(){
        let cronometroID = setInterval(function(){
            tempoRestante--
            $('#tempo-digitacao').text(tempoRestante)
            if (tempoRestante < 1) {
                campo.attr('disabled', true)
                clearInterval(cronometroID)
                campo.addClass('campo-desativado')
            }
        }, 1000)
    })
}

function inicializaMarcadores(){
    let frase = $('.frase').text()
    campo.on('input', function(){
    let digitado = campo.val()
    let comparavel = frase.substr(0, digitado.length)

    if (digitado == comparavel) {
        campo.removeClass('borda-vermelha')
        campo.addClass('borda-verde')        
    } else {
        campo.removeClass('borda-verde')
        campo.addClass('borda-vermelha')
    }
})

}



function reiniciaJogo(){
    campo.attr('disabled', false)
    campo.val('')
    $('#contador-palavras').text('0')
    $('#contador-caracteres').text('0')
    $('#tempo-digitacao').text(tempoInicial)
    inicializaCronometro()
    campo.removeClass('campo-desativado')
    campo.removeClass('borda-vermelha')
    campo.removeClass('borda-verde')
}