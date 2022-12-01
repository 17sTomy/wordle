const FIRST_WORD = document.querySelector(".first-word").children,
    SECOND_WORD = document.querySelector(".second-word").children,
    THIRD_WORD = document.querySelector(".third-word").children,
    FOURTH_WORD = document.querySelector(".fourth-word").children,
    FIFTH_WORD = document.querySelector(".fifth-word").children,
    SIXTH_WORD = document.querySelector(".sixth-word").children,
    $BTN = document.querySelector("#btn-send"),
    firstWordArray = Array.from(FIRST_WORD),
    secondWordArray = Array.from(SECOND_WORD),
    thirdWordArray = Array.from(THIRD_WORD),
    fourthWordArray = Array.from(FOURTH_WORD),
    fifthWordArray = Array.from(FIFTH_WORD),
    sixthWordArray = Array.from(SIXTH_WORD),
    $MODAL = document.querySelector(".modal-content"),
    $TIMER = document.querySelector(".timer"),
    $BTN_REPLAY = document.querySelector("#replay"),
    ALL_WORDS = []

let word1 = "",
    word2 = "",
    word3 = "",
    word4 = "",
    word5 = "",
    word6 = "",
    wordInGame,
    exists = true,
    lives = 6,
    win = false,
    seconds = 0,
    minutes = 0,
    hours = 0


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '95e4c72fadmsh83661b743d20861p1939d8jsn914faf53bab1',
        'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
     }
};

async function getWords(){
    const wordsFetch = await fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=1000', options)
    const wordsJson = await wordsFetch.json()
    const wordsJson5 = wordsJson.filter(word => word.length === 5)
    wordsJson5.forEach(word => {
        if (!word.includes("á") && !word.includes("é") && !word.includes("í") && !word.includes("ó") && !word.includes("ú")){
            word = word.toUpperCase()
            ALL_WORDS.push(word)
        }
    })
    chooseWord(ALL_WORDS)
}

const myInterval = setInterval(myTimer, 1000);

function myTimer() {
    seconds++
    if (seconds >= 59){
        seconds = 0
        minutes++
    }
    if (minutes >= 59) {
        minutes = 0
        hours++
    }
        
    let time = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    const $h4 = document.createElement("h4")
    $TIMER.innerHTML = ""
    $h4.textContent = time
    $TIMER.appendChild($h4)
}

const message = (array) => {
    checkWin(array)
    setTimeout(() => {
        showMessage()
    }, 800);
}

const showMessage = () => {
    if (lives <= 0 && !win){
        clearInterval(myInterval)
        $MODAL.style.display = "block"
        $MODAL.children[0].textContent = "Perdiste! La palabra era:"
        $MODAL.children[1].textContent = wordInGame
        $MODAL.children[2].textContent = `Tiempo jugado: ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }else if (win){
        clearInterval(myInterval)
        $MODAL.style.display = "block"
        $MODAL.children[0].textContent = "Adivinaste la palabra! :)"
        $MODAL.children[1].textContent = wordInGame
        $MODAL.children[2].textContent = `Tiempo jugado: ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
}
   
const checkWin = inputs => {
    for (let i = 0; i < inputs.length; i++){
        if (!inputs[i].matches(".correct")){
            return
        }
    }
    win = true
}
    
const nextFocus = (event, array2) => {
    let currentInput = event.target
    let indexFocus = array2.indexOf(currentInput)
    if (indexFocus < 4 && currentInput.value != ""){
        array2[indexFocus + 1].focus()
    }
}

const previousFocus = (event, array2) => {
    let currentInput = event.target
    let indexFocus = array2.indexOf(currentInput)
    if (indexFocus > 0){
        array2[indexFocus].value = ""
        array2[indexFocus - 1].focus()
    }
}

const disableInputs = inputs => {
    for (let i = 0; i < inputs.length; i++){
        inputs[i].disabled = true
    }
}

const enableInputs = inputs => {
    for (let i = 0; i < inputs.length; i++){
        inputs[i].disabled = false
    }
}

const chooseWord = data => {
    randomPosition = Math.floor(Math.random() * data.length)
    wordInGame = data[randomPosition].toUpperCase()
    while (wordInGame.indexOf("ñ") !== -1 || wordInGame.length !== 5){
        randomPosition = Math.floor(Math.random() * data.length)
        wordInGame = data[randomPosition].toUpperCase()
    }
    console.log(wordInGame);
}

const armarPalabra = (wordArray, word) => {
    for (let i = 0; i < 5; i++){
        word += wordArray[i].value
    }
    if (word.length !== 5) return
    return word.toUpperCase()
}

const chequearSiExiste = (word, inputs) => {
    exists = (ALL_WORDS.indexOf(word) === -1) ? false : true
    if(!exists){
        inputs.forEach(input => {
            input.classList.add("error")
        })
        setTimeout(() => {
            inputs.forEach(input => {
                input.classList.remove("error")
            })
        }, 1300);
    }
}

const correctCharacter = (word, input) => {
    for (let i = 0; i < 5; i++){
        if (word[i] === wordInGame[i]){
            input[i].classList.add("correct")
        }
    }
}

const contadorApariciones = caracter => {
    let appearences = 0
    for (let j = 0; j < 5; j++){
        if (caracter === wordInGame[j]){
            appearences += 1
        }
    }
    return appearences
}

const contadorAparicionesVerdes = (word, wordInGame, input, apariciones, apariciones2) => {
    if (word === wordInGame && input.matches(".correct") && apariciones === 2){      
        apariciones2++
    }
    return apariciones2
}

const existingCharacter = (word, input) => {
    let claseVerde = []
    for (let i = 0; i < 5; i++){
        let apariciones = contadorApariciones(word[i])
        for (let j = 0; j < 5; j++){
            if (word[i] === wordInGame[j] && input[i].matches(".correct") && apariciones === 1){
                claseVerde.push(word[i])
            }
        }
    }

    let apariciones2 = 0
    let apariciones3 = 0
    let repetidoras = []
    let repetidoras3 = []
    for (let i = 0; i < 5; i++){
        let contador = 0
        let aparece = false
        let apariciones = contadorApariciones(word[i])
        for (let k = 0; k < 5; k++){
            contador += 1
            if (word[i] === wordInGame[k] && !input[i].matches(".correct") && apariciones === 1){
                for (caracter of claseVerde){
                    if (caracter === word[i]){
                        aparece = true
                    }
                }
                if (aparece){
                    input[i].classList.add("not-found")
                }else{
                    input[i].classList.add("in-another-position")
                }
            }
            
            if (word[i] === wordInGame[k] && input[i].matches(".correct") && apariciones === 2 && k === i){      
                apariciones2++
            } 
            if (word[i] === wordInGame[k] && !input[i].matches(".correct") && apariciones === 2){      
                repetidoras.push(i)
            } 
            
            if (word[i] === wordInGame[k] && input[i].matches(".correct") && apariciones === 3 && k === i){      
                apariciones3++
            } 
            if (word[i] === wordInGame[k] && !input[i].matches(".correct") && apariciones === 3){      
                repetidoras3.push(i)
            } 
        }     
    }

    if (apariciones2 < 2){
        for (pos of repetidoras){
            input[pos].classList.add("in-another-position")
        }
    }else{
        for (pos of repetidoras){
            input[pos].classList.add("not-found")
        }
    }

    if (apariciones3 < 3){
        for (pos of repetidoras3){
            input[pos].classList.add("in-another-position")
        }
    }else{
        for (pos of repetidoras3){
            input[pos].classList.add("not-found")
        }
    }
}

const nonexistingCharacter = (word, input) => {
    for (let i = 0; i < 5; i++){
        if (wordInGame.indexOf(word[i]) === -1){
            input[i].classList.add("not-found")
        }
    }
}

const play = () => {
    if (lives === 6){
        word1 = armarPalabra(FIRST_WORD, word1)
        if (word1 === undefined){
            word1 = ""
            return
        }
        chequearSiExiste(word1, firstWordArray)
        if (exists){
            correctCharacter(word1, FIRST_WORD)
            existingCharacter(word1, FIRST_WORD)
            nonexistingCharacter(word1, FIRST_WORD)
            disableInputs(FIRST_WORD)
            message(FIRST_WORD)
            lives -= 1
            enableInputs(SECOND_WORD)
            if (!win){
                secondWordArray[0].disabled = false
                secondWordArray[0].focus()
            }
        }
    }else if(lives === 5){
        word2 = armarPalabra(SECOND_WORD, word2)
        if (word2 === undefined){
            word2 = ""
            return
        }
        chequearSiExiste(word2, secondWordArray)
        if (exists){
            correctCharacter(word2, SECOND_WORD)
            existingCharacter(word2, SECOND_WORD)
            nonexistingCharacter(word2, SECOND_WORD)
            disableInputs(SECOND_WORD)
            message(SECOND_WORD)
            lives -= 1
            enableInputs(THIRD_WORD)
            if (!win){
                thirdWordArray[0].disabled = false
                thirdWordArray[0].focus()
            }
        }
    }else if (lives === 4){
        word3 = armarPalabra(THIRD_WORD, word3)
        if (word3 === undefined){
            word3 = ""
            return
        }
        chequearSiExiste(word3, thirdWordArray)
        if (exists){
            correctCharacter(word3, THIRD_WORD)
            existingCharacter(word3, THIRD_WORD)
            nonexistingCharacter(word3, THIRD_WORD)
            disableInputs(THIRD_WORD)
            message(THIRD_WORD)
            lives -= 1
            enableInputs(FOURTH_WORD)
            if (!win){
                fourthWordArray[0].disabled = false
                fourthWordArray[0].focus()
            }      
        }
    }else if (lives === 3){
        word4 = armarPalabra(FOURTH_WORD, word4)
        if (word4 === undefined){
            word4 = ""
            return
        }
        chequearSiExiste(word4, fourthWordArray)
        if (exists){
            correctCharacter(word4, FOURTH_WORD)
            existingCharacter(word4, FOURTH_WORD)
            nonexistingCharacter(word4, FOURTH_WORD)
            disableInputs(FOURTH_WORD)
            message(FOURTH_WORD)
            lives -= 1
            enableInputs(FIFTH_WORD)
            if (!win){
                fifthWordArray[0].disabled = false
                fifthWordArray[0].focus()
            } 
        }
    }else if (lives === 2){
        word5 = armarPalabra(FIFTH_WORD, word5)
        if (word5 === undefined){
            word5 = ""
            return
        }
        chequearSiExiste(word5, fifthWordArray)
        if (exists){
            correctCharacter(word5, FIFTH_WORD)
            existingCharacter(word5, FIFTH_WORD)
            nonexistingCharacter(word5, FIFTH_WORD)
            disableInputs(FIFTH_WORD)
            message(FIFTH_WORD)
            lives -= 1
            enableInputs(SIXTH_WORD)
            if (!win){
                sixthWordArray[0].disabled = false
                sixthWordArray[0].focus()
            } 
        }
    }else if (lives === 1){
        word6 = armarPalabra(SIXTH_WORD, word6)
        if (word6 === undefined){
            word6 = ""
            return
        }
        chequearSiExiste(word6, sixthWordArray)
        if (exists){
            correctCharacter(word6, SIXTH_WORD)
            existingCharacter(word6, SIXTH_WORD)
            nonexistingCharacter(word6, SIXTH_WORD)
            disableInputs(SIXTH_WORD)
            message(SIXTH_WORD)
            lives -= 1 
        }
    } 
}

    
document.addEventListener("DOMContentLoaded", () => {
    getWords()
    firstWordArray[0].focus()
})

$BTN.addEventListener("click", play)
document.addEventListener("keyup", (event) => {
    if (event.code === 'Enter') {
        play()
    }
})

const movements = (event, array) => {
    if (event.code === "Backspace"){
        previousFocus(event, array)
        return
    }else{
        nextFocus(event, array)
    }
}

firstWordArray.forEach(input => input.addEventListener("keyup", (event) => {
    movements(event, firstWordArray)
}))

secondWordArray.forEach(input => input.addEventListener("keydown", (event) => {
    movements(event, secondWordArray)
}))

thirdWordArray.forEach(input => input.addEventListener("keyup", (event) => {
    movements(event, thirdWordArray)
}))

fourthWordArray.forEach(input => input.addEventListener("keyup", (event) => {
    movements(event, fourthWordArray)
}))

fifthWordArray.forEach(input => input.addEventListener("keyup", (event) => {
    movements(event, fifthWordArray)
}))

sixthWordArray.forEach(input => input.addEventListener("keyup", (event) => {
    movements(event, sixthWordArray)
}))

$BTN_REPLAY.addEventListener("click", () => {
    location.reload()
})