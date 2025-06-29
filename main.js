let letters = "abcdefghijklmnopqrstuvwxyz";
//  get array 
let lettersArray = Array.from(letters);

// object of words and category 
const obj = {
    programming: ['php', 'javascript', 'html', 'python', 'go', 'swift', 'mysql', 'scal', 'fortran'],
    people: ['Albert Einstein', 'Hitchcock', 'Alexander', 'Celopatra', 'Ramses', 'Mahatma Ghandi'],
    countries: ['Egypt', 'Syria', 'Palisten', 'Yemen', 'Bahrien', 'Qatar'],
    movies: ['prestige', 'inception', 'parasite', 'interstellar', 'whiplash', 'memnto', 'coco', 'up',],
};

// select letters
const lettersContainer = document.querySelector(".letters")

// generate letters
lettersArray.forEach(l => {
    let span = document.createElement("span");
    span.append(document.createTextNode(l))
    span.classList = 'letter-box';
    lettersContainer.append(span)
})


// get object keys in array
let keys = Object.keys(obj)

// random number of object keys
let randomKey = Math.floor(Math.random() * keys.length)
// choosen category 
let category = keys[randomKey];
// choosen category's value => array
let categoryData = obj[category];


// random number for the choosen word 
let randomWord = Math.floor(Math.random() * categoryData.length);
//choosen word
let choosenWord = categoryData[randomWord].toLowerCase()



// set category
document.querySelector(".game-info .category span").innerHTML = category;


// set array from the choosen word
let arrayFromWord = Array.from(choosenWord);


// create spans depend on word
arrayFromWord.forEach(l => {
    let span = document.createElement("span");
    span.classList = "letter"
    l === " " ? span.classList = "with-space" : "";
    document.querySelector(".container .letter-guss").append(span)
})



let allBtn = document.querySelectorAll(".container .row .letters span");
let wrongAnswer = 0;
let rightAnswer = 0;

allBtn.forEach(b => {

    b.onclick = _ => {

        // handel the button
        b.classList.add("clicked");

        // check if the word has this charactar 
        if (arrayFromWord.includes(b.innerHTML)) {

            arrayFromWord.forEach((l, index) => {
                if (l == b.innerHTML) {
                    ++rightAnswer;
                    rightAnswer == arrayFromWord.length ? endGame("Successfully", "Next") : "";
                    document.querySelectorAll(".container .letter-guss span").forEach((span, spanIndex) => {
                        spanIndex === index ? span.innerHTML = l.toUpperCase() : "";
                    })
                }
            })

        } else {
            if (wrongAnswer < 7) {
                document.querySelector(".container .hangman-draw").classList.add(`wrong-${++wrongAnswer}`)
            } else {
                document.querySelector(".container .hangman-draw").classList.add("wrong-8");
                endGame("Oops! You Are Failed", "Try Again");
            }
        }
    }


})

let overlay = document.querySelector(".overlay");
let popup = document.querySelector(".popup");
let popupP = document.querySelector(".popup p");
let yesBtn = document.querySelector(".popup .yes");
let noBtn = document.querySelector(".popup .no");

function endGame(p, btn) {
    overlay.style.display = "flex"
    popupP.innerHTML = `${p}`;
    yesBtn.innerHTML = `${btn}`;
    noBtn.innerHTML = "Exit"
}
