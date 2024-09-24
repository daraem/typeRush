palabra = document.getElementById("typed")
letras = new Array


document.body.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        letras = []
    } else {
        letras.push(e.key)
    }
    palabra.innerText = letras.join("")
})