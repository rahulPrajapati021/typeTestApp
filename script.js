const testParagraphBox = document.querySelector(".testParagraphBox"); // in this div words are populated
const restartKey = document.getElementById("restart"); // restart button
let keyInput = document.getElementById("keyInput");

// this is for development period onl

let fetchedParagraph = randomPara(); // this function comes from paragraph.js 
let letters = [];

// above is for development period only

// if paragraph is fetched then do this

function populateTestParagraph() {
  testParagraphBox.innerHTML = "";

  let data = fetchedParagraph.trim().split(" ");

  data.forEach((word) => {
    let htmlLetterTemplate = "";

    Array.from(word).forEach((letter) => {
      let template = `
            <span class="letters">${letter}</span>
            `;
      htmlLetterTemplate += template;
    });

    let htmlTemplate = `<div class="word">
                ${htmlLetterTemplate}</div>
        `;
    // letters.forEach((l) => console.log(l))
    testParagraphBox.innerHTML += htmlTemplate;
  });
}


// now we listen to individual key press and then check if
// it is in our letters array or not;

let timeFlag = false; // counter flag to stop setting counter multiple time
let time = 30; // counter 
let typeCursor = document.getElementById("typingCursor");
let counter = document.querySelector(".Counter");
let typedLetters = []; // for calcuation we need this
let setTimeId, setIntervalId;

keyInput.addEventListener("textInput", (key) => {
  if (!timeFlag) {
    timeFlag = true;
    let numCounter = time;
    setIntervalId = setInterval(() => {
      if (numCounter > 0) {
        counter.innerText = numCounter--;
      }
    }, 1000);

    setTimeId = setTimeout(timeOutFunction, time * 1000);
  }
  // so isWritable will check the following key is present in our array

  if (letters.length == 0) {
    return 0;
  } else {
    if (key.data == letters[0].innerText) {
        // it means typed character is correct 
      letters[0].after(typeCursor);
      typedLetters.push(letters[0]);
      // if it is correct then add the correct class to it
      letters[0].classList.add("correct");
      // i have to remove the last class so the "correct" class can take over
      letters[0].classList.remove("letters");
      keyInput.value = null;
      letters.shift(); // now shifts the letter[0] so the next letter comes at 0th position
    } 
    else if (key.data == " ") {
      letters[0].before(typeCursor);
    }
    else {
        // when typed character is wrong
      typedLetters.push(letters[0]);
      letters[0].after(typeCursor);
      letters[0].classList.add("wrong");
      letters[0].classList.remove("letters");
      keyInput.value = null;
      letters.shift();
    }
  }
  keyInput.value = null;
});

keyInput.addEventListener("keydown", (e) => {
  if (e.key == "Backspace" && !(typedLetters.length == 0)) {
    let t = typedLetters.length - 1;
    letters.unshift(typedLetters[t]);
    letters[0].classList.remove("correct");
    letters[0].classList.remove("wrong");
    letters[0].classList.add("letters");
    letters[0].before(typeCursor);
    typedLetters.pop();
  }
});

// adding blur effect when lost focus from input area
keyInput.onblur = () => {
  // blurEffectBox is kind of layer applied on
  let blurEffectBox = document.querySelector(".onBlurEffect");
  blurEffectBox.style.display = "flex";
  blurEffectBox.onclick = () => {
    blurEffectBox.style.display = "none";
    keyInput.focus();
  };
};

keyInput.onfocus = () => {
  document.querySelector(".onBlurEffect").style.display = "none";
};

//now if the timer is over then the calculate function will take over

/*
    Net WPM = Gross WPM - (uncorrected Errors/time-min);
          
        = [(all letter)/5] - Uncorrected Errors
                        time (min)
*/

function calculateSpeed() {
  let totalCorrectLetters = document.getElementsByClassName("correct").length;
  let totalWrongLetters = document.getElementsByClassName("wrong").length;

  let totalLetters = totalCorrectLetters + totalWrongLetters;

  let timeInMin = time / 60;

  let grossWpm = totalLetters / 5 / timeInMin;

  let resultWPM = grossWpm - totalWrongLetters / 5 / timeInMin;

  let resultPanel = document.querySelector(".Result");

  let htmlTemplate = `<div>
        <div>Net Wpm = ${resultWPM}</div>
        <div>Gross Wpm = ${grossWpm}</div>
    </div>`;

  document.querySelector(".Test_Box").style.display = "none";
  resultPanel.innerHTML = htmlTemplate;
  resultPanel.style.display = "flex";
}

// timeout function definetion // it will work when the timeouts

function timeOutFunction() {
  calculateSpeed();
}

//when page loads it should populate paragraph /

// ===================================================================================

let load = () => {
  populateTestParagraph();
  letters = document.getElementsByClassName("letters");
  letters = Array.from(letters);
  letters[0].before(typeCursor);

  keyInput.focus();
};

load();

restartKey.onclick = () => {
  timeFlag = false;
  time = 30;
  console.log("restarting...");
  clearTimeout(setTimeId);
  clearInterval(setIntervalId);
  counter.innerText = "";
  let resultPanel = document.querySelector(".Result");
  resultPanel.style.display = "none";
  document.querySelector(".Test_Box").style.display = "block";
  load();
};
