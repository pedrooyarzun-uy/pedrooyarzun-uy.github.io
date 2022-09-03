let container = document.getElementById('main-container')

const makeCardsForResponse = (data) => {
    let card = `
    <div class="list-group-item list-group-item-action products-cards">
        <div class="row">
            <div class="col-3">
                <img src="${data.image}" alt="${data.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${data.name}</h4>
                </div>
                <p class="mb-1">${data.description}</p>
                <p class="mb-2"> <b>Precio: </b>${data.currency} ${data.cost}</p>
                <p class="mb-2"> <b>Cant. Vendidos: </b>${data.soldCount} 
            </div>
        </div>
    </div>
    `
    container.innerHTML += card
}

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE)
    .then(response => {
        localStorage.setItem('productos', JSON.stringify(response.data.products))        
        for(let object in response.data.products){
            makeCardsForResponse(response.data.products[object])
        }
        let textTitle = document.createTextNode(response.data.catName)
        let textDescription = document.createTextNode("Aqui veras todos los " + response.data.catName.toLowerCase() + " disponibles a la venta")
        document.getElementById("titleContent").appendChild(textTitle)
        document.getElementById("titleDescription").appendChild(textDescription)
        
    })


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
