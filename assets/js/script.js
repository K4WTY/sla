const saldoInput = document.querySelector('#saldoInput')
const creditButton = document.querySelector('#creditoButton')
const debitButton = document.querySelector('#debitoButton')
const extractButton = document.querySelector('#extratoButton')
const containerOne = document.querySelector('#containerUm')
const containerTwo = document.querySelector('#containerDois')
const containerThree = document.querySelector('#containerTres')
const pContainer = document.querySelector('#pC2')
const pContainerTwo = document.querySelector('#pC2-2')
const sendButton = document.querySelector('#enviarButton')
const backButton = document.querySelector('#voltarButton')
const inputValor = document.querySelector('#inputValor')
const inputMotivo = document.querySelector('#inputMotivo')
const printExtract = document.querySelector('#extratoP')
const saldoP = document.querySelector('#saldoP')
const cancelButton = document.querySelector('#cancelarButton')

let mainArray = []
let saldo = 0

creditButton.addEventListener('click', function() {
    containerOne.style.display = 'none'
    pContainer.innerHTML = 'Qual o valor desta creditação?'
    pContainerTwo.innerHTML = 'Qual o motivo desta creditação?'
    containerTwo.style.display = 'flex'
})

debitButton.addEventListener('click', function() {
    if(saldo > 0) {
        containerOne.style.display = 'none'
        pContainer.innerHTML = 'Qual o valor desta debitação?'
        pContainerTwo.innerHTML = 'Qual o motivo desta debitação?'
        containerTwo.style.display = 'flex'
    } else {
        alert('Sem saldo')
    }

})

extractButton.addEventListener('click', function() {
    containerOne.style.display = 'none'
    let extratoString = ''
    for(let i = 0; i < mainArray.length; i++) {
        extratoString += `${mainArray[i].motivo} - ${mainArray[i].creditDebit} - R$ ${mainArray[i].valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`
    }
    printExtract.innerHTML = extratoString
    saldoP.innerHTML = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    containerThree.style.display = 'flex'
})

sendButton.addEventListener('click', function() {
    let informacoes = {}

    if(inputValor.value != '' && inputMotivo.value != '') {
        if(pContainer.innerHTML == 'Qual o valor desta creditação?') {
            informacoes.valor = Number(inputValor.value)
            informacoes.motivo = inputMotivo.value
            informacoes.creditDebit = 'C'
            saldo += informacoes.valor
            saldoInput.placeholder = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            inputValor.value = ''
            inputMotivo.value = ''
            containerOne.style.display = 'flex'
            containerTwo.style.display = 'none'
            mainArray.push(informacoes)
        } else if(pContainer.innerHTML == 'Qual o valor desta debitação?') {
            informacoes.valor = Number(inputValor.value)
            if(informacoes.valor > saldo) {
                alert('Saldo insuficiente')
            } else {
                informacoes.motivo = inputMotivo.value
                informacoes.creditDebit = 'D'
                saldo -= informacoes.valor
                saldoInput.placeholder = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                inputValor.value = ''
                inputMotivo.value = ''
                containerOne.style.display = 'flex'
                containerTwo.style.display = 'none'
                mainArray.push(informacoes)
            }
        }
    } else {
        alert('Algum campo está vazio')
    }
})

backButton.addEventListener('click', function() {
    containerOne.style.display = 'flex'
    containerThree.style.display = 'none'
})

cancelButton.addEventListener('click', function() {
    inputValor.value = ''
    inputMotivo.value = ''
    containerOne.style.display = 'flex'
    containerTwo.style.display = 'none'
})