let tempoInicial = $('#tempo-digitacao').text()
let campo = $('.campo-digitacao')

$(function(){
    atualizaTamanhoFrase()
    inicializaContadores()
    inicializaCronometro()
    inicializaMarcadores()
    $('#botao-reiniciar').click(reiniciaJogo)
    atualizaPlacar()
    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    })

    $('.tooltip').tooltipster({
        trigger: 'custom'
    })
})

function atualizaTempoInicial(tempo) { 
    tempoInicial = tempo
    $('#tempo-digitacao').text(tempo)
}

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
    campo.one('focus', function(){
        let tempoRestante = $('#tempo-digitacao').text() 
        let cronometroID = setInterval(function(){
            tempoRestante--
            $('#tempo-digitacao').text(tempoRestante)
            if (tempoRestante < 1) {
                clearInterval(cronometroID)
                finalizaJogo()            
            }
        }, 1000)
    })
}

function finalizaJogo(){
    campo.attr('disabled', true)                
    campo.addClass('campo-desativado')
    inseriPlacar()
}

function inicializaMarcadores(){    
    campo.on('input', function(){
        let frase = $('.frase').text()
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