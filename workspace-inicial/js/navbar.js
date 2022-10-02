document.addEventListener("DOMContentLoaded", () => {
    let li = document.getElementById("userEmail")
    let text = document.createTextNode(localStorage.getItem("email"))
    li.appendChild(text)
})

document.getElementById("close-session").addEventListener("click", () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    window.location.replace("/")
})