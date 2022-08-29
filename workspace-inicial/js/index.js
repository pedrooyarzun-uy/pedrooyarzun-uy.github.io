document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    let li = document.getElementById("userEmail")
    let a = document.createElement("a")
    let text = document.createTextNode(localStorage.getItem("email"))
    a.appendChild(text)
    a.classList.add("nav-link")
    a.style.color = "white"
    li.appendChild(a)
});