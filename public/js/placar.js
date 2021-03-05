function inseriPlacar(){
    let corpoTabela = $('.placar').find('tbody')
    let usuario = 'Rubens'
    let numPalavras = $('#contador-palavras').text()
    //let botaoRemover = '<a href="#"><i class="small material-icons">delete</i></a>'

    let linha = novaLinha(usuario, numPalavras)
    linha.find('.botao-remover').click(removeLinha)

    corpoTabela.prepend(linha)
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
    $(this).parent().parent().remove()
}

/*
$('.botao-remover').click(function (event) { 
    event.preventDefault() 
    $(this).parent().parent().remove()
})
*/