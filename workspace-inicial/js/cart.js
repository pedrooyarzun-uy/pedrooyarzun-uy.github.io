document.addEventListener("DOMContentLoaded", () => {
    
    getJSONData(CART_INFO_URL + '25801' + EXT_TYPE)
    .then((response) => {
        makeRowsOfList(response.data.articles[0])
    })
    
    const products = JSON.parse(localStorage.getItem('userCart'))
    for(let product in products){
        getJSONData(PRODUCT_INFO_URL + products[product].id + EXT_TYPE)
        .then((response) => {
            
            let data = {
                id: response.data.id, 
                name: response.data.name,
                unitCost: response.data.cost,
                currency: response.data.currency, 
                image: response.data.images[0],
                count: products[product].quantity  
            }
            makeRowsOfList(data)
        })
    }
    
    document.getElementById("credit-card").addEventListener("click", handlePaymentMethod)
    document.getElementById("bank-account").addEventListener("click", handlePaymentMethod)
    document.getElementById('purchase-form').addEventListener('submit', handlePurchase)
})

var typeOfShipment = ''

const makeRowsOfList = (data) => {
    
        const {id, name, count, unitCost, currency, image} = data
        
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
                <input id="${id}-quantity"type="text" class="form-control" value="${count}" onkeyup="handleQuantityChange(this.value, this.id)">
            </td>
            <td id="${id}-subtotal">
                ${currency} ${count * unitCost}
            </td>
            <td>
                <button type="button" class="btn btn-outline-danger" id="${id}-remove" onClick="deleteCard(this.id)">Eliminar</button>
            </td>
        </tr>
        `
        tbody.innerHTML += row
        
        handleQuantityChange(count, id)        
}

const handleQuantityChange = (count = '' , id) => {
    if(count != '' && isNaN(id)){
        id = id.split('-')[0]
        
        let cost = (document.getElementById(`${id}-cost`).textContent.trim()).split(' ')
        
        let subTotal = document.getElementById(`${id}-subtotal`)
        let currency = subTotal.textContent.trim().split(' ')[0]

        let price = cost[1] * count
        
        subTotal.innerHTML = '' 
        subTotal.innerHTML = `${currency} ${ price}` 
        handleSubtotalPrice()
        handleShipmentPrice(typeOfShipment)
    } else {
        if (count != ''){
            let cost = (document.getElementById(`${id}-cost`).textContent.trim()).split(' ')
            let price = cost[1] * count
            handleSubtotalPrice()
            handleShipmentPrice(typeOfShipment)
        } else {
            handleSubtotalPrice()
            id = id.split('-')[0]
            let subTotal = document.getElementById(`${id}-subtotal`)
            subTotal.innerHTML = `USD 0`
            handleShipmentPrice(typeOfShipment)
        }
    }
    handleTotalPrice()
}

const handleSubtotalPrice = () => {
    let tableCart = document.getElementById('table-cart') 
    let subTotalsElement = tableCart.querySelectorAll('[id*="-subtotal"]')
    let currency = null
    subTotal = 0

    for (let x = 0; x<subTotalsElement.length; x++){
        if(x === 0){
            currency = subTotalsElement[x].textContent.trim().split(' ')[0] 
        }
        subTotal += parseInt(subTotalsElement[x].textContent.trim().split(' ')[1])
    }
  
    document.getElementById('subtotal').innerHTML = `${currency} ${subTotal}`
    
}

const handleShipmentPrice = (type = '') => {

    if(type){
        let entry = (document.getElementById('subtotal').textContent).trim().split(' ')
        currency = entry[0]
        subTotal = entry[1]
        let costOfShipping = document.getElementById(type).value
        costOfShipping = (subTotal * costOfShipping) / 100
        let shippingPrice = document.getElementById('shipping-price')
        shippingPrice.innerHTML = `${currency} ${costOfShipping}` 
        typeOfShipment = type
    }
    handleTotalPrice()
}

const handleTotalPrice = () => { 
    let shipmentPrice = document.getElementById("shipping-price").textContent.trim().split(' ')
    let currency = document.getElementById("subtotal").textContent.trim().split(' ')[0]
    let total = document.getElementById('total') 
    let subTotal = document.getElementById("subtotal").textContent.trim().split(' ')[1]
    
    if(subTotal == 0){

    }

    if(shipmentPrice == ''){   
        total.innerHTML = `${currency} ${subTotal}`
    } else {
        shipmentPrice = shipmentPrice[1]
        total.innerHTML = ' '
        total.innerHTML = `${currency} ${parseInt(subTotal) + parseInt(shipmentPrice)}`   
    }
    
    
   
}

const handlePurchase = () => {

    let state = false
    let form = document.getElementById('purchase-form').elements[0].value
    
    if(form > 0 || form != ''){
        state = false
    }
    
    if(!handlePaymentMethod()){
        state = false
    }

    if(!handleShipmentAddress()){
        state = false
    }

    if(!handleShipmentMethod()){
        state = false
    }
    
    if(handlePaymentMethod() && handleShipmentMethod() && handleShipmentAddress() && form != 0 && form != ''){
        let alert = document.getElementById("alert-success")
        
        alert.innerHTML += `<p id='text-for-success'>Su compra ha sido realizada exitosamente!</p>`
        alert.classList.add('show')
        setTimeout(() => {
            alert.classList.remove('show')
            alert.removeChild(document.getElementById('text-for-success'))
        }, 5000) 
        state = true
    } 
    
    return state


    
}

const handleShipmentMethod = () => {
    let shipmentMethod = []
    let shipmentIsChecked = false

    shipmentMethod.push(document.getElementById('premium').checked)
    shipmentMethod.push(document.getElementById('express').checked)
    shipmentMethod.push(document.getElementById('standard').checked)

    for(i of shipmentMethod){
        if(i !== false){
            shipmentIsChecked = true
        }
    }
    return shipmentIsChecked
}

const handleShipmentAddress = () => {
    
    let street = document.getElementById('street')
    let streetNumber = document.getElementById('street-number')
    let streetCorner = document.getElementById('street-corner')

    let state = false

    if(!street.value){
        street.classList.add('is-invalid')
        setTimeout(() => {
            street.classList.remove('is-invalid')
        }, 5000)
    }

    if(!streetNumber.value){
        streetNumber.classList.add('is-invalid')
        setTimeout(() => {
            streetNumber.classList.remove('is-invalid')
        }, 5000)
    }

    if(!streetCorner.value){
        streetCorner.classList.add('is-invalid')
        setTimeout(() => {
            streetCorner.classList.remove('is-invalid')
        }, 5000)
    }
     
    if(street.value && streetNumber.value && streetCorner.value){
        state = true
    }

    return state
}

const handlePaymentMethod = () => {

    let bankNumber = document.getElementById('bank-number')
    let cardNumber = document.getElementById('card-number')
    let securityCode = document.getElementById('security-code')
    let cardDate = document.getElementById('card-date')

    let creditCardCheck = document.getElementById('credit-card').checked
    let bankAccountCheck = document.getElementById('bank-account').checked
    
    if(bankAccountCheck){
        cardDate.disabled = true 
        cardNumber.disabled = true
        securityCode.disabled = true
        bankNumber.disabled = false

        if(!bankNumber.value){
            return false
        } else {
            return true
        }
    } 

    if(creditCardCheck){

        bankNumber.disabled = true
        cardDate.disabled = false 
        cardNumber.disabled = false
        securityCode.disabled = false
    
        if(!cardNumber.value || !securityCode.value || !cardDate.value){
            return false
        } else {
            return true
        }
    }
    
    if(!(creditCardCheck && bankAccountCheck)){
        document.getElementById('warning-payment').classList.remove('d-none')
        setTimeout(() => {
            document.getElementById('warning-payment').classList.add('d-none')
        }, 5000)

        return false
    }
}

const deleteCard = (id) => {
    id = id.split('-')[0]
    let td = document.getElementById(id)
    td.remove()
    handleSubtotalPrice()
    handleShipmentPrice(typeOfShipment)
    
    let cart = JSON.parse(localStorage.getItem('userCart'))
    
    const objWithIndex = cart.findIndex((obj) => obj.id == id)

    if(objWithIndex > -1){
        cart.splice(objWithIndex, 1)
    }
    localStorage.setItem('userCart', JSON.stringify(cart))
}