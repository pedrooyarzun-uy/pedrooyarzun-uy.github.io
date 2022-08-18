let container = document.getElementById('main-container')

getJSONData(PRODUCTS_URL + '101.json')
.then(response => {
    console.log(response)
    for(let object in response.data.products){
        makeCardsForResponse(response.data.products[object])
    }
})

const makeCardsForResponse = (data) => {
    console.log(data)
    let card = `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="../${data.image}" alt="${data.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${data.name}</h4>
                </div>
                <p class="mb-1">${data.description}</p>
                <p class="mb-2"> <b>Precio: </b>U$D${data.cost}</p>
            </div>
        </div>
    </div>
    `
    container.innerHTML += card
}

