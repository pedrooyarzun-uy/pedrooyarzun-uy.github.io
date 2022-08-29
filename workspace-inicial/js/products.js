let container = document.getElementById('main-container')

getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + ".json")
.then(response => {
    for(let object in response.data.products){
        makeCardsForResponse(response.data.products[object])
    }
    let textTitle = document.createTextNode(response.data.catName)
    let textDescription = document.createTextNode("Aqui veras todos los " + response.data.catName.toLowerCase() + " disponibles a la venta")
    document.getElementById("titleContent").appendChild(textTitle)
    document.getElementById("titleDescription").appendChild(textDescription)
})

const makeCardsForResponse = (data) => {
    let card = `
    <div class="list-group-item list-group-item-action">
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

let title = document.getElementById("titleContent")
let text = document.createTextNode()
