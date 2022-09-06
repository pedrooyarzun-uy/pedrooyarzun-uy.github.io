var name = document.getElementById("name")
var description = document.getElementById("description")
var category = document.getElementById("category")
var sellQuantity = document.getElementById("sellQuantity")

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("productId") + EXT_TYPE)
    .then(response => {
        laodProduct(response.data)
        
    })
})

const laodProduct = (data) => {
    let name = document.createTextNode(data.name)
    let description = document.createTextNode(data.description)
    let category = document.createTextNode(data.category)
    let sellQuantity = document.createTextNode(data.soldCount)
    let price = document.createTextNode(data.currency + ' ' + data.cost)
    
    document.getElementById("name").appendChild(name)
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
