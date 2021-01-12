// variables
var qOne = "Commonly used data types DO NOT Include:";
var qTwo = "_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.";
var qThree = "What is the correct JavaScript syntax to write 'Hello World'?";
var qFour = "What is the correct syntax for referring to an external script called 'abc.js'?";
var qFive =  "Is it possible to nest functions in JavaScript?";
var timerCount = 75;
var done = false;
var score = 0;
var timerText = document.getElementById("timer-text");
var qNumber = 1;
var qText = document.getElementById("question-text");
var startButton = document.querySelector("#start-button");
var quizInfo = document.getElementById("quiz-info");
var mainInfo = document.getElementById("main-info");
var br = document.createElement("br");
var hr = document.createElement("hr");
var interval = 1000;
// var sumbitInitials = document.querySelector("#submit-initials");

// question choices.
var qOneChoices = ["1. strings", "2. booleans", "3. alerts", "4. numbers"];
var qTwoChoices = ["1. Client-side", "2. Server-side", "3. Local", "4. Native"];
var qThreeChoices = ["1. System.out.printIn('Hello World');", "2. printIn ('Hello World');", "3. document.write('Hello World');", "4. response.write('Hello World');"];
var qFourChoices = ["1. <script href= 'abc.js'>", "2. <script name='abc.js'>", "3. <script src='abc.js'>", "4. None of the above"];
var qFiveChoices = ["1. True", "2. False"];

function startGame() { 
  startButton.setAttribute("class", "d-none");
  quizInfo.setAttribute("class", "d-none");
  startTimer();
  runGame();
}

function runGame(){
  // do {
    if (qNumber === 1) {
      qText.innerHTML = qOne;
      answer = "3";
      createButtons(qOneChoices, answer);
    }
    if (qNumber === 2) {
      qText.innerHTML = qTwo;
      answer = "1";
      createButtons(qTwoChoices, answer);
    }
    if (qNumber === 3) {
      qText.innerHTML = qThree;
      answer = "3";
      createButtons(qThreeChoices, answer);
    }
    if (qNumber === 4) {
      qText.innerHTML = qFour;
      answer = "3";
      createButtons(qFourChoices, answer);
    }
    if (qNumber === 5) {
      qText.innerHTML = qFive;
      answer = "1";
      createButtons(qFiveChoices, answer);
    }
}

function createButtons(arr, cAnswer) {
  var cDiv = document.createElement("div");
  cDiv.classList.add("d-grid", "col-6", "mx-auto")
  cDiv.setAttribute("id", "question-choices");
  for (var i = 0; i < arr.length; i++) {
    mainInfo.appendChild(cDiv);
    var button = document.createElement("button");
    button.classList.add(i+1);
    var text = document.createTextNode(arr[i]);
    button.appendChild(text);
    button.classList.add("btn", "btn-dark");
    cDiv.appendChild(button);
  }
  isCorrect(cAnswer, cDiv);
  return;
}

function isCorrect(c,cDiv) {
  var qChoices = document.getElementById("question-choices");
  var ciText = "";
  qChoices.addEventListener("click", function(event){
    event.stopPropagation();
    if(!event.target.classList.contains(c)) {
      ciText = "Incorrect!";      
      timerCount -= 10;
    } else {
      ciText = "Correct!";
    }
    nextQuestion();
    showResult(ciText);  
  });
  return;
}

function nextQuestion() {
  // removeElementsByClass("button-answers");
  document.getElementById("question-choices").remove();
  if (qNumber === 5){
    done = true;
  }
  else {
    qNumber++;
    runGame();
  }
  return;
}

function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerText.textContent = "Time:" + timerCount;
    if (timerCount >= 0) {
      if (done && timerCount > 0) {
        score = timerCount;
        clearInterval(timer);
        setTimeout(function () {
          goToAllDone();
        }, 1000);  
      }
    }
    if (timerCount === 0) {
      score = 0;
      clearInterval(timer);
      interval = 0;
      setTimeout(function () {
        goToAllDone();
      }, 1000);  
    }
  }, 1000);
  return;
}

function goToAllDone(){
  qText.innerHTML = "All done!"
  quizInfo.innerHTML = "Your final score is " + score + "!";
  quizInfo.className = quizInfo.className.replace(/\bd-none\b/g, "")
  var a = document.getElementById("question-choices")
  if (a) {
    document.getElementById("question-choices").remove();
  }
  var aDiv = document.createElement("div");
  aDiv.setAttribute("class", "mb-3 row");
  var enterInitials = document.createElement("label");
  enterInitials.setAttribute("class", "col-sm-2 col-form-label");
  enterInitials.setAttribute("for", "inputInitials");
  enterInitials.setAttribute("id", "enterInitials");
  enterInitials.innerHTML = "Enter Initials:"
  var initialsForm = document.createElement("input");
  initialsForm.setAttribute("type", "text");
  initialsForm.setAttribute("class", "form-control");
  initialsForm.setAttribute("id", "inputInitials");
  initialsForm.setAttribute("maxlength", "3")
  var fDiv = document.createElement("div");
  fDiv.setAttribute("class", "col-sm-8");
  siButton = document.createElement("button");
  siButton.classList.add("btn", "btn-dark", "col-sm-2");
  siButton.setAttribute("id", "submit-initials")
  siButton.innerHTML = "Submit";
  mainInfo.appendChild(aDiv);
  aDiv.appendChild(enterInitials);
  aDiv.appendChild(fDiv);
  aDiv.appendChild(siButton);
  fDiv.appendChild(initialsForm);
  siButton.addEventListener("click", sumbitInitials);
  return;
}

function showResult(ciText) {
  ci = document.getElementById("correct-incorrect");
  displayIC = document.createElement("h1");
  var text = document.createTextNode(ciText);
  displayIC.appendChild(text);
  displayIC.setAttribute("id", "display-IC");
  ci.appendChild(displayIC);
  setTimeout(function () {
    document.getElementById("display-IC").remove();
  }, 1000);  
}

function goToHighScores() {
  window.location.replace('/Code_Quiz_NP/highscores.html');
}

function sumbitInitials() {
    var initials = document.querySelector("#inputInitials").value;
    if (initials === "") {
      displayMessage("error", "Email cannot be blank").trim();
    } else {
      localStorage.setItem("initials", initials);
      localStorage.setItem("Score", score);
      goToHighScores();
    }
}

startButton.addEventListener("click", startGame);

