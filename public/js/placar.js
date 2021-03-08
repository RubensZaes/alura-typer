$('#botao-placar').click(mostraPlacar)
$('#botao-frase-sync').click(sincronizaPlacar)

function inseriPlacar(){
    let corpoTabela = $('.placar').find('tbody')
    let usuario = $('#usuarios').val()
    let numPalavras = $('#contador-palavras').text()
    //let botaoRemover = '<a href="#"><i class="small material-icons">delete</i></a>'

    let linha = novaLinha(usuario, numPalavras)
    linha.find('.botao-remover').click(removeLinha)

    corpoTabela.prepend(linha)
    $('.placar').slideDown();
    scrollPlacar()
}

function scrollPlacar(){
    let posicaoPlacar = $('.placar').offset().top
    $('body').animate({
        scrollTop: posicaoPlacar + 'px'
    }, 1000)
}

function novaLinha(usuario, palavras) {
    let linha = $('<tr>')
    let colunaUsuario = $('<td>').text(usuario)
    let colunaPalavras = $('<td>').text(palavras)
    let colunaRemover = $('<td>')

    //Botão Remover
    let link = $('<a>').addClass('botao-remover').attr('href', '#')
    let icone = $('<i>').addClass('small').addClass('material-icons').text('delete')

    link.append(icone)
    colunaRemover.append(link)
    linha.append(colunaUsuario)
    linha.append(colunaPalavras)
    linha.append(colunaRemover)

    return linha
}

function removeLinha() {  
    event.preventDefault()
    let linha = $(this).parent().parent()
    linha.fadeOut()
    setTimeout(function () { 
        linha.remove()
    }, 1000)
}

function mostraPlacar() {
    $('.placar').stop().slideToggle(500);
}

function sincronizaPlacar() {
    let placar = []
    let linhas = $('tbody>tr')

    linhas.each(function(){
        let usuario = $(this).find('td:nth-child(1)').text()
        let palavras = $(this).find('td:nth-child(2)').text()

        let score = {
            usuario: usuario,
            pontos: palavras
        }
        placar.push(score)
    })
    let dados = {
        placar: placar
    }
    $.post('http://localhost:3000/placar', dados, function(){
        console.log('Salvando dados no servidor...');
        $('.tooltip').tooltipster('open').tooltipster('content', 'Sucesso ao sincronizar!')
    })
    .fail(function(){
        $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sincronizar!')
    }, 1200)
    .always(function(){
        setTimeout(function(){
            $('.tooltip').tooltipster('close')
        }, 1200)        
    })
}

function atualizaPlacar(){
    $.get('http://localhost:3000/placar', function(data){
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos)
            linha.find('.botao-remover').click(removeLinha)
            $('tbody').append(linha)
        })
    })
}