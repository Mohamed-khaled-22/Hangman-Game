let letters = "abcdefghijklmnopqrstuvwxyz";
// get array
let lettersArray = Array.from(letters);

// object of words and category
const obj = {
    programming: [
        { word: "php", hint: "A scripting language for web development" },
        { word: "javascript", hint: "A language used to make websites interactive" },
        { word: "html", hint: "The standard markup language for web pages" },
        { word: "python", hint: "A beginner-friendly programming language" },
        { word: "go", hint: "A fast, compiled language from Google" },
        { word: "swift", hint: "A modern language for iOS development" },
        { word: "mysql", hint: "A relational database management system" },
        { word: "scal", hint: "A typo? Maybe you meant 'scala' 😄" },
        { word: "fortran", hint: "An old language used in scientific computing" },
    ],
    people: [
        { word: "Albert Einstein", hint: "A theoretical physicist who developed the theory of relativity" },
        { word: "Hitchcock", hint: "The Master of Suspense" },
        { word: "Alexander", hint: "The Great conqueror from Macedonia" },
        { word: "Celopatra", hint: "The last active ruler of the Ptolemaic Kingdom of Egypt" },
        { word: "Ramses", hint: "A famous Egyptian pharaoh" },
        { word: "Mahatma Ghandi", hint: "A leader of the Indian independence movement" },
    ],
    countries: [
        { word: "Egypt", hint: "The land of the pyramids" },
        { word: "Syria", hint: "A country in Western Asia" },
        { word: "Palisten", hint: "Region in the Middle East, spelling might be off 😅" },
        { word: "Yemen", hint: "A country at the southern end of the Arabian Peninsula" },
        { word: "Bahrien", hint: "Small island country in the Persian Gulf, probably 'Bahrain'" },
        { word: "Qatar", hint: "Hosted FIFA World Cup 2022" },
    ],
    movies: [
        { word: "prestige", hint: "A film about rival magicians" },
        { word: "inception", hint: "A sci-fi movie about dreams within dreams" },
        { word: "parasite", hint: "An Oscar-winning Korean film" },
        { word: "interstellar", hint: "A sci-fi film about space travel and time" },
        { word: "whiplash", hint: "A drama about a drummer and a strict teacher" },
        { word: "memnto", hint: "A film told in reverse, maybe you meant 'Memento'" },
        { word: "coco", hint: "An animated film about family and music" },
        { word: "up", hint: "An animated adventure with a flying house" },
    ],
};

// select letters
const lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach((l) => {
    let span = document.createElement("span");
    span.append(document.createTextNode(l));
    span.classList = "letter-box";
    lettersContainer.append(span);
});

// get object keys in array
let keys = Object.keys(obj);

// random number of object keys
let randomKey = Math.floor(Math.random() * keys.length);
// chosen category
let category = keys[randomKey];
// chosen category's value => array
let categoryData = obj[category];

// random number for the chosen word
let randomWord = Math.floor(Math.random() * categoryData.length);
// chosen word and hint
let chosenWord = categoryData[randomWord].word.toLowerCase();
let chosenHint = categoryData[randomWord].hint;

// set category
document.querySelector(".game-info .category span").innerHTML = category;

// show hint
let hintElement = document.createElement("div");
hintElement.classList = "hint";
hintElement.innerHTML = `<strong>Hint:</strong> ${chosenHint}`;
document.querySelector(".game-info").append(hintElement);

// set array from the chosen word
let arrayFromWord = Array.from(chosenWord);

// create spans depend on word
arrayFromWord.forEach((l) => {
    let span = document.createElement("span");
    span.classList = "letter";
    l === " " ? (span.classList = "with-space") : "";
    document.querySelector(".container .letter-guss").append(span);
});

let allBtn = document.querySelectorAll(".container .row .letters span");
let wrongAnswer = 0;
let rightAnswer = 0;

allBtn.forEach((b) => {
    b.onclick = (_) => {
        // handle the button
        b.classList.add("clicked");

        // check if the word has this character
        if (arrayFromWord.includes(b.innerHTML)) {
            arrayFromWord.forEach((l, index) => {
                if (l == b.innerHTML) {
                    ++rightAnswer;
                    rightAnswer == arrayFromWord.length
                        ? endGame("Successfully", "Next")
                        : "";
                    document
                        .querySelectorAll(".container .letter-guss span")
                        .forEach((span, spanIndex) => {
                            spanIndex === index
                                ? (span.innerHTML = l.toUpperCase())
                                : "";
                        });
                }
            });
        } else {
            if (wrongAnswer < 7) {
                document
                    .querySelector(".container .hangman-draw")
                    .classList.add(`wrong-${++wrongAnswer}`);
            } else {
                document
                    .querySelector(".container .hangman-draw")
                    .classList.add("wrong-8");
                endGame("Oops! You Are Failed", "Try Again");
            }
        }
    };
});

let overlay = document.querySelector(".overlay");
let popup = document.querySelector(".popup");
let popupP = document.querySelector(".popup p");
let yesBtn = document.querySelector(".popup .yes");
let noBtn = document.querySelector(".popup .no");

function endGame(p, btn) {
    overlay.style.display = "flex";
    popupP.innerHTML = `${p}`;
    yesBtn.innerHTML = `${btn}`;
    noBtn.innerHTML = "Exit";
}