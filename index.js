const FIRST_WORD = document.querySelector(".first-word").children,
    SECOND_WORD = document.querySelector(".second-word").children,
    THIRD_WORD = document.querySelector(".third-word").children,
    FOURTH_WORD = document.querySelector(".fourth-word").children,
    FIFTH_WORD = document.querySelector(".fifth-word").children,
    SIXTH_WORD = document.querySelector(".sixth-word").children,
    $BTN = document.querySelector("#btn-send"),
    ALL_WORDS = ["ATOMO","BACHE","CELDA","DUELO","EPICO","FACIL","GANSO"],
    firstWordArray = Array.from(FIRST_WORD),
    secondWordArray = Array.from(SECOND_WORD),
    thirdWordArray = Array.from(THIRD_WORD),
    fourthWordArray = Array.from(FOURTH_WORD),
    fifthWordArray = Array.from(FIFTH_WORD),
    sixthWordArray = Array.from(SIXTH_WORD),
    $MODAL = document.querySelector(".modal-content"),
    $TIMER = document.querySelector(".timer"),
    $BTN_REPLAY = document.querySelector("#replay")

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
    hours = 0,
    keep = true


const message = (array) => {
    checkWin(array)
    setTimeout(() => {
        showMessage()
    }, 800);
}

const showMessage = () => {
    if (lives <= 0 && !win){
        keep = false
        $MODAL.style.display = "block"
        $MODAL.children[0].textContent = "Perdiste! La palabra era:"
        $MODAL.children[1].textContent = wordInGame
        $MODAL.children[2].textContent = `Tiempo jugado: ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }else if (win){
        keep = false
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

const chooseWord = () => {
    randomPosition = Math.floor(Math.random() * ALL_WORDS.length)
    wordInGame = ALL_WORDS[randomPosition]
    console.log(wordInGame);
}

const armarPalabra = (wordArray, word) => {
    for (let i = 0; i < 5; i++){
        word += wordArray[i].value
    }
    if (word.length !== 5) return
    return word.toUpperCase()
}

const chequearSiExiste = word => {
    if(ALL_WORDS.indexOf(word) === -1){
        exists = false
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
    
    for (let i = 0; i < 5; i++){
        let aparece = false
        for (let k = 0; k < 5; k++){
            if (word[i] === wordInGame[k] && !input[i].matches(".correct")){
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
        console.log(word1);
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
    }else if(lives === 5){
        word2 = armarPalabra(SECOND_WORD, word2)
        if (word2 === undefined){
            word2 = ""
            return
        }
        console.log(word2);
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
    }else if (lives === 4){
        word3 = armarPalabra(THIRD_WORD, word3)
        if (word3 === undefined){
            word3 = ""
            return
        }
        console.log(word3);
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
    }else if (lives === 3){
        word4 = armarPalabra(FOURTH_WORD, word4)
        if (word4 === undefined){
            word4 = ""
            return
        }
        console.log(word4);
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
    }else if (lives === 2){
        word5 = armarPalabra(FIFTH_WORD, word5)
        if (word5 === undefined){
            word5 = ""
            return
        }
        console.log(word5);
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
    }else if (lives === 1){
        word6 = armarPalabra(SIXTH_WORD, word6)
        if (word6 === undefined){
            word6 = ""
            return
        }
        console.log(word6);
        correctCharacter(word6, SIXTH_WORD)
        existingCharacter(word6, SIXTH_WORD)
        nonexistingCharacter(word6, SIXTH_WORD)
        disableInputs(SIXTH_WORD)
        message(SIXTH_WORD)
        lives -= 1 
    } 
}
    
document.addEventListener("DOMContentLoaded", () => {
    chooseWord()
    firstWordArray[0].focus()
    setInterval(() => {
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
    }, 1000);
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