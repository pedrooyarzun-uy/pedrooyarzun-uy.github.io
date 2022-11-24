document.addEventListener("DOMContentLoaded", () => {
    
    if(!localStorage.getItem('email')){
        window.location.replace('/')
    }
    loadProfile()
    document.getElementById('profile-form').addEventListener("submit", (e) => {
        validateProfileInfo(e)
    })
})


const validateProfileInfo = (e) => {
    e.preventDefault()

    let form = document.querySelectorAll('#profile-form input')
    
    let state = {}

    Array.from(form).forEach(element => {
        
        const {id, value} = element
         
        if(!value){
            if((id === 'second-name' || id === 'cellphone' || id === 'second-surname')){
                state[id] = true
            } else {
                state[id] = false
                setErrorOnInput(id)
            }
        } else {
            state[id] = true
        }
    })
    
    if(Object.values(state).every(Boolean)){
        saveProfile()
        showSuccessAlert()
    }
}

const saveProfile = () => {
    let form = document.getElementById('profile-form')
    
    let data = {}
    
    Array.from(form.elements).forEach(element => {
        
        const {id, value} = element
        
        if(element.value){
            data[id] = value
        } else {
            return false
        }
    })

    localStorage.setItem('profileData', JSON.stringify(data))
    data.email ? localStorage.setItem('email', data.email) : ''    
}

const loadProfile = () => {
    let form = document.querySelectorAll('#profile-form input')
    
    let profileData = JSON.parse(localStorage.getItem('profileData'))
    
    if(profileData){
        Array.from(form).forEach(element => {
            
            const {id} = element
            
            if(profileData[id]){
                element.value = profileData[id]
            }
        })
    } else {
        form[4].value = localStorage.getItem('email')
    }
}

const showSuccessAlert = () => {
    let alert = document.getElementById("alert-success")
        
    alert.innerHTML += `<p id='text-for-success'>Se ha guardado su perfil correctamente</p>`
    alert.classList.add('show')
    setTimeout(() => {
        alert.classList.remove('show')
        alert.removeChild(document.getElementById('text-for-success'))
    }, 5000)
}

const setErrorOnInput = (id) => {
    let element = document.getElementById(id)
    element.classList.add('is-invalid')
    setTimeout(() => {
        element.classList.remove('is-invalid')
    }, 5000)
}