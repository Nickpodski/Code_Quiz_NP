// variables
var qOne = "Commonly used data types DO NOT Include:";
var qTwo = "_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.";
var qThree = "What is the correct JavaScript syntax to write 'Hello World'?";
var timerCount = 75;
var qNumber = 1;
var qText = document.getElementById("question-text");
var startButton = document.querySelector("#start-button");
var quizInfo = document.getElementById("quiz-info");
var mainInfo = document.getElementById("main-info");

// question 1 choices.
var qOneChoices = ["1. strings", "2. booleans", "3. alerts", "4. numbers"];
var qTwoChoices = ["1. Client-side", "2. Server-side", "3. Local", "4. Native"];
var qThreeChoices = ["1. System.out.printIn('Hello World');", "2. printIn ('Hello World');", "3. document.write('Hello World');", "4. response.write('Hello World');"];


function startGame() { 
  startButton.setAttribute("class", "d-none");
  quizInfo.setAttribute("class", "d-none");
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
}

function createButtons(arr, cAnswer) {
  var cDiv = document.createElement("div");
  cDiv.classList.add("d-grid", "col-6", "mx-auto")
  cDiv.setAttribute("id", "question-choices");
  for (var i = 0; i < arr.length; i++) {
    mainInfo.appendChild(cDiv);
    var button = document.createElement("button");
    button.classList.add(i+1)
    var text = document.createTextNode(arr[i]);
    var br = document.createElement("br");
    button.appendChild(text);
    button.classList.add("btn", "btn-dark");
    cDiv.appendChild(br);
    cDiv.appendChild(button);
  }
  isCorrect(cAnswer);
}


function isCorrect(c) {
  var qChoices = document.getElementById("question-choices");
  qChoices.addEventListener("click", function(event){
    event.stopPropagation();
    if(!event.target.classList.contains(c)) {
      alert("Incorrect");
      timerCount -= 10;
    } else {
      alert("Correct");
    }
    nextQuestion();
  });
}

function nextQuestion() {
  document.getElementById("question-choices").remove();
  qNumber++;
  startGame();
}


startButton.addEventListener("click", startGame);
