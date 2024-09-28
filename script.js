const objective = document.getElementById("word")
const word = document.getElementById("typed")

let letras = new Array
let objectiveWord;

let points = (localStorage.getItem("save") ? Number(localStorage.getItem("save")) : 0);
let miniPoints = 0;

function addWord() {
    fetch('wordDB/WordlistSpanish.txt')
        .then(response => {
            return response.text(); 
        })
        .then(data => {
            objectiveWord = (data.replace(/[^\S\r\n]+/g, '').split("\n")[Math.floor(Math.random() * data.split("\n").length)]);
            objective.innerText = objectiveWord;
        })
        document.getElementById("points").innerText = `Points: ${points}`
}

addWord()

document.body.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        if (objectiveWord == word.innerText) {
            miniPoints += 1
            document.getElementsByClassName("bar")[0].style.height = `${(miniPoints/5)*100}%` 
            if(miniPoints == 5) {
                points += 1
                miniPoints = 0
            }
        }
        letras = []
        addWord()
    } else if (e.key == "Backspace") {
        letras.pop()
        if(letras[letras.length-1] = objectiveWord[letras.length-1]) {
            word.style.color = "green"
        }
    } 
    if(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(e.key)) {
        word.style.color = "green"
        letras.push(e.key)
        if(letras[letras.length-1] != objectiveWord[letras.length-1]) {
            if(points > 0) {
                points -= 1
            }
            document.getElementById("points").innerText = `Points: ${points}`
            word.style.color = "red"
        }
    }
    word.innerText = letras.join("")
})

setInterval(() => {
    localStorage.setItem("save", points)
}, 1000)