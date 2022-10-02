
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("productId") + EXT_TYPE)
    .then(response => {
        loadProduct(response.data)
        loadRelatedProducts(response.data.relatedProducts)
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productId") + EXT_TYPE)
    .then(response => {
        loadComments(response.data)
    })
})

const loadProduct = (data) => {
    let name = document.createTextNode(data.name)
    let description = document.createTextNode(data.description)
    let category = document.createTextNode(data.category)
    let sellQuantity = document.createTextNode(data.soldCount)
    let price = document.createTextNode(data.currency + ' ' + data.cost)
    document.getElementById("name-ejemplo").innerHTML += data.name
    document.getElementById("description").appendChild(description)
    document.getElementById("category").appendChild(category)
    document.getElementById("price").appendChild(price)
    document.getElementById("sellQuantity").appendChild(sellQuantity)
    document.getElementById("card-header").appendChild(name)

    let carouselDiv = document.getElementById("carousel-inner")
    for(let image in data.images){
        let product = null
        if(image == 0){
            product = `
                <div class="carousel-item active">
                    <img src="./${data.images[image]}" alt=".." class="d-block w-100">
                </div>
            `
        } else {
            product = `
                <div class="carousel-item">
                    <img src="./${data.images[image]}" alt=".." class="d-block w-100">
                </div>
            `
        }
        carouselDiv.innerHTML += product
    }
}

const loadComments = (data) => {
    for (let comment in data){
        makeCommentCards(data[comment])
    }
}

const makeCommentCards = (data) => {
    let containerForComments = document.getElementById("comments-section-start") 
    
    let card = `
    <div class="card text-dark bg-light mb-3" style="margin-top: 0px;">
        <div class="card-header" id="user-name">
            <i class="fas fa-user"></i>
            ${data.user}
        </div>
        <div class="card-body">
            <h5 class="card-title" id="stars-section"> ${asignStars(data.score)} </h5>
            <small class="text-muted">${data.dateTime}</small>
            <p class="card-text" id="comment-description">${data.description}</p>
        </div>
    </div>
    `

    containerForComments.innerHTML += card
}

const asignStars = (stars) => {
    let totalStars = ''
    for(let x = 0; x< parseInt(stars); x++){
        totalStars += `<span class="fa fa-star checked"></span>`
    }
    return totalStars
}

const loadRelatedProducts = (data) => {
    for (let product in data){
        makeRelatedProductsCards(data[product])
    }
}

const makeRelatedProductsCards = (data) => {
    let container = document.getElementById("card-deck")
    const {image, name, id} = data
    let card = `
    <div class="card cursor-active" style="width: 18rem;" onclick="setCatID(${id})">
        <img class="card-img-top" src="${image}" alt="Card image cap" >
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
        </div>
    </div>
    `

    container.innerHTML += card
    
}


const setCatID = (id) => {
    localStorage.setItem("productId", id)
    window.location = "product-info.html"
}