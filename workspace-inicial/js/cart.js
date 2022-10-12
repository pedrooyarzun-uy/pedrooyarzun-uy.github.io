document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_URL + '25801' + EXT_TYPE)
    .then(response => {
        makeRowsOfList(response.data)
    })
})



const makeRowsOfList = (data) => {
    
    const {id, name, count, unitCost, currency, image} = data.articles[0]
    
    let tbody = document.getElementById("table-cart")
    let row = `
    <tr id="${id}">
        <td class="col-lg-1 col-md-1 col-sm-1 col-xs-1 col-xl-1">
            <img src="${image}" alt="${name}" class="img-thumbnail">
        </td>
        <td>
            ${name}
        </td>
        <td id="${id}-cost">
            ${currency} ${unitCost}
        </td>
        <td class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
            <input id="${id}-quantity"type="text" class="form-control" value="${count}" onkeyup="handleChange(this.value, this.id)">
        </td>
        <td id="${id}-subtotal">
            ${currency} ${count * unitCost}
        </td>
    </tr>
    `
    tbody.innerHTML += row
}

const handleChange = (value, id) => {
    id = id.split('-')[0]

    let cost = (document.getElementById(`${id}-cost`).textContent.trim()).split(' ')[1]
    let subTotal = document.getElementById(`${id}-subtotal`)
    let currency = subTotal.textContent.trim().split(' ')[0]
    
    subTotal.innerHTML = currency + ' ' + cost * value
}