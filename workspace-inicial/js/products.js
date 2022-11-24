let container = document.getElementById('main-container')

const makeCardsForResponse = (data) => {
    let firstDiv = document.createElement('div')
    firstDiv.className = 'list-group-item list-group-item-action products-cards cursor-active'
    firstDiv.onclick = () => {clickOnCard(data.id)} 

    let row = document.createElement('div')
    row.className = 'row'
    
    let firstCol = document.createElement('div')
    firstCol.className = 'col-3'
    
    let img = document.createElement('img')
    img.src = data.image
    img.className = 'img-thumbnail'
    img.alt = data.description

    let secondCol = document.createElement('div')
    secondCol.className = 'col'

    let secondDiv = document.createElement('div')
    secondDiv.className = 'd-flex w-100 justify-content-between'

    let h4 = document.createElement('h4')
    h4.className = 'mb-1'
    h4.innerHTML = data.name

    let firstP = document.createElement('p')
    firstP.className = 'mb-1'
    firstP.innerHTML = data.description
    
    let secondP = document.createElement('p')
    secondP.className = 'mb-2'
    let firstB = document.createElement('b')
    firstB.innerHTML = 'Precio: '
    secondP.appendChild(firstB)
    secondP.innerHTML += data.currency
    secondP.innerHTML += ' ' + data.cost
    
    
    let thirdP = document.createElement('p')
    thirdP.className = 'mb-2'
    let secondB = document.createElement('b')
    secondB.innerHTML = 'Cant. Vendidos: '
    thirdP.appendChild(secondB)
    thirdP.innerHTML += data.soldCount

    firstCol.appendChild(img)
    
    secondDiv.appendChild(h4)
    
    secondCol.appendChild(secondDiv)
    secondCol.appendChild(firstP)
    secondCol.appendChild(secondP)
    secondCol.appendChild(thirdP)

    row.appendChild(firstCol)
    row.appendChild(secondCol)
    firstDiv.appendChild(row)
    container.appendChild(firstDiv)
}

const makeTextForElement = (text) => {
    let textContent = document.createTextNode(text)
    return textContent
}

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE)
    .then(response => {      
        for(let object in response.data.products){
            makeCardsForResponse(response.data.products[object])
        }
        let textTitle = document.createTextNode(response.data.catName)
        let textDescription = document.createTextNode("Aqui veras todos los " + response.data.catName.toLowerCase() + " disponibles a la venta")
        document.getElementById("titleContent").appendChild(textTitle)
        document.getElementById("titleDescription").appendChild(textDescription)
        
    })

    document.getElementById('searcher').addEventListener('input', filterBySearch)
})

const deleteDisplayedCards = () => {
    const displayedCards = document.querySelectorAll(".products-cards");
    for(let card of displayedCards){
        card.remove()
    }
}

const filterByDesc = () => {
    deleteDisplayedCards()
    let cards = JSON.parse(localStorage.getItem("productos"))
    cards.sort((a, b) => a.cost - b.cost);
    for (let card in cards){
        makeCardsForResponse(cards[card])
    }
}

const filterByAsc = () => {
    deleteDisplayedCards()
    let cards = JSON.parse(localStorage.getItem("productos"))
    cards.sort((a, b) => b.cost - a.cost)
    for (let card in cards){
        makeCardsForResponse(cards[card])
    }
}

const filterByRelevance = () => {
    deleteDisplayedCards()
    let cards = JSON.parse(localStorage.getItem('productos'))
    cards.sort((a,b) => b.soldCount - a.soldCount)
    for (let card in cards) {
        makeCardsForResponse(cards[card])
    }
    
}

const filterBySearch = (text) => {
    deleteDisplayedCards()
    
    let cards = JSON.parse(localStorage.getItem('productos'))
    
    for (const card in cards) {
        if(cards[card].name.includes(text) || cards[card].description.includes(text)){
            makeCardsForResponse(cards[card])
        } 
    } 
}

const filterByRange = () => {
    let rangeMinimum = document.getElementById('rangeFilterCountMin').value
    let rangeMaximum = document.getElementById('rangeFilterCountMax').value
    
    if(rangeMaximum == '' && rangeMinimum == ''){
        return showAlertError('Minimo y maximo estan vacios')
    }

    if(rangeMaximum == ''){
        return showAlertError('Maximo esta vacio')
    }
    
    if (rangeMinimum == ''){
        return showAlertError('Minimo esta vacio')
    }
    
    deleteDisplayedCards()
    let cards = JSON.parse(localStorage.getItem("productos"))
    let cardCounter = 0
    for(let card in cards){
        if(cards[card].cost <= rangeMaximum && cards[card].cost >= rangeMinimum){
            cardCounter++
            makeCardsForResponse(cards[card])
        }
    }

    if(cardCounter === 0){
        for (let card in cards){
            makeCardsForResponse(cards[card])
        }
        showAlertError('No se encontraron productos en ese rango de precio')
    }
}

const clearFilters = () => {
    deleteDisplayedCards()
    let cards = JSON.parse(localStorage.getItem("productos"))
    for (let card in cards) {
        makeCardsForResponse(cards[card])
    }
    document.getElementById('rangeFilterCountMin').value = ''
    document.getElementById('rangeFilterCountMax').value =''
}

const showAlertError = (text) => {
    let alert = document.getElementById("alert-danger")
    alert.innerHTML += `<p id='text-for-danger'>${text}</p>`
    alert.classList.add('show')
    setTimeout(() => {
        alert.classList.remove('show')
        alert.removeChild(document.getElementById('text-for-danger'))
    }, 5000)    
}

const clickOnCard = (id) => {
    localStorage.setItem("productId", id)
    window.location = 'product-info.html'
}