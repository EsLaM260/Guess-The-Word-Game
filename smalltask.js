// setting game name
let gameName = "Guess The Words";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML =`${gameName } Game Created by Eslam Mostafa`

// Setting Game Option
// عدد المحاولات
let numberOfTries = 6;
// رقم اول محاوله
let curentTry = 1;
// عدد المحاولات
let numberOfHints = 2;

// manage words
let wordToGuess = "";
// const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
const words = ["Eslam","Ali","Amir","Adam","mostafa","Hazem","Omar","Sara"];
// عدد جروف الكلمه
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
// بتجيب الحروف بشكل دينمك علي حسب الكلمه
let numberOfLetters = wordToGuess.length;
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  // div have all inputs
  const inputsContainer = document.querySelector(".inputs");

  // create main try div
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`Try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    // بيعمل disabled علي كل الديفات ماعدا الاول
    if (i != 1) {
      tryDiv.classList.add("disabled-input");
    }
    // Create inputs
    for (let ii = 1; ii <= numberOfLetters; ii++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-Letter-${ii}`;
      // بيخلي الماكس حرف واحد بس
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();

  // disable All Inputs Except First one
  const inputsInDisabledDiv = document.querySelectorAll(".disabled-input input");
  //make all input after first row disabled 
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");


  inputs.forEach((input,index) => {

    input.addEventListener("input", function () {
      if (this.value != "") {
        // convert inputs to capital latter
        this.value = this.value.toUpperCase();
        const nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus();
      }
    });

    input.addEventListener("keydown", function (event) {
      let cureentIndex = Array.from(inputs).indexOf(event.target); //OR this

      if (event.key == "ArrowRight") {
        const nextInput = cureentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      };
      
      if (event.key == "ArrowLeft") {
        const prevInput = cureentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      };

    });

  });

}

const guessButton = document.querySelector(".check");

guessButton.addEventListener("click", handleGuesses);


function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(`#guess-${curentTry}-Letter-${i}`);
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic

    if (letter === actualLetter) {
      // letter is correct and in place
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter != "") {
      // letter is correct but not in place
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      // letter is wrong and not in place
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // check if user win or lose
  if (successGuess) {
    messageArea.innerHTML = `You Win after The word is <span>${wordToGuess}</span>`;

    if (numberOfHints = 2) {
      messageArea.innerHTML = `<p>congratz You Didn't Use Hints</p>`
    }

    // Add disabled class on all try divs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    console.log(allTries);

    //Disable check buttuon
    guessButton.disabled = true;
    getHintButton.disabled = true;

  } else {
    


    document.querySelector(`.Try-${curentTry}`).classList.add("disabled-input");
    const curentTryInputs = document.querySelectorAll(`.Try-${curentTry} input`);
    curentTryInputs.forEach((input) => (input.disabled = true));

    curentTry++;

    const nextTryInputs = document.querySelectorAll(`.Try-${curentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));
    
    let el = document.querySelector(`.Try-${curentTry}`);
    if (el) {
      document.querySelector(`.Try-${curentTry}`).classList.remove("disabled-input");
      el.children[1].focus;
    }else{
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You lose the word is <span>${wordToGuess}</span>`;
    }
  }

}

function getHint() {

  if (numberOfHints > 0 ) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }

  if (numberOfHints == 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");

  if (emptyEnabledInputs.length > 0) {
    // باختصار الراندوم انديكس بيجيب مكان من الاماكن الفاضيه و يضيف فيها الحرف الي بنفس رقم الانديكس
    // و ده غلط عشان بيبقي مكان الحرف غلط 
    // عشان كده بنسخدم الي ف السطر الي بعد ده ب 3 عشان يجيب اللوكيشن المظبوط للحرف الي طلع
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    console.log(randomIndex);
    console.log(emptyEnabledInputs);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }

}

function handleBackspace(event) {

  if (event.key == "Backspace") {
    
    const inputs = document.querySelectorAll("input:not([disabled])");
    // active element  دي بتجيب العنصر الي انت واقف عليه حاليا
    const cureentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (cureentIndex >= 0) {
      const currentInput = inputs[cureentIndex];
      const prevInput = inputs[cureentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }

  }

}
document.addEventListener("keydown", handleBackspace);

console.log(wordToGuess);

window.onload = generateInput;

