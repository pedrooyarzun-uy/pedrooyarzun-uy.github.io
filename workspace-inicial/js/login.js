let form = document.forms['loginForm']

const validateForm = () => {
    let emailInput = form['emailInput'].value
    let passwordInput = form['passwordInput'].value
    
    if(passwordInput === '' && emailInput === '') {
        showAlertError('El email y la contraseña no pueden ser vacios')
        setErrorOutput('passwordInput')
        setErrorOutput('emailInput')
        return false
    } else {
        if(passwordInput !== ''){
            if(emailInput !== ''){
                if(passwordInput >= 6) {
                    console.log('todo ok')
                } else {
                    console.log(passwordInput)
                    setErrorOutput('passwordInput')
                    showAlertError('La contraseña tiene que tener mas de 6 caracteres')
                    return false
                }
            } else {
                setErrorOutput('emailInput')
                showAlertError('El email no puede ser vacio')
                return false
            }
        } else {
            setErrorOutput('passwordInput')
            showAlertError('La contraseña no puede ser vacia')
            return false
        }
    }
}

const setErrorOutput = (element) => {
    form[element].classList.add('error-input')
    setTimeout(() => {
        form[element].classList.remove('error-input')
    }, 5000)
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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}