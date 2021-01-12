var hsList = document.createElement("ul");
var highScores = document.querySelector("#high-scores");
// var newInitials = localStorage.getItem("initials");
// var newScores = localStorage.getItem("score");
var clearHS = document.querySelector('#clearHS-button');
var goBack = document.querySelector('#goBack-button');
var storedPlayers = [];
const oldPlayers = [];
const oldInitials = [];
const oldScore = [];
var x = 1;




function init() {
  JSON.parse(window.localStorage.getItem('oldPlayers'));
  var newInitials = JSON.parse(localStorage.getItem("initials"))
  var newScores = JSON.parse(localStorage.getItem("score"))
  console.log(newScores)
  if (newInitials !== null) {
    initials = newInitials;
  }
  if (newScores !== null) {
    score = newScores;
  }
  oldPlayers.push(oldInitials, oldScore)
  oldPlayers.push(newInitials, newScores)
  storeOldPlayers();
  var player = {
    initials: newInitials,
    score: newScores
  };
  localStorage.setItem("player", JSON.stringify(player));
  storedPlayers.push(player.initials,player.score);
  localStorage.setItem("storedPlayers", JSON.stringify(storedPlayers));
  // localStorage.storedPlayers += JSON.stringify({"Player": newInitials, "Score": newScores})
  renderHighScore(storedPlayers);
  console.log(storedPlayers[0])
  
  // console.log(storedPlayers.length);
  // renderScores();
  // findHighScore(player.score);
}

function storeOldPlayers() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("oldPlayers", JSON.stringify(oldPlayers));
}

// function renderScores() {
//   for (var i = 0; i < scores.length; i++) {
//     var score = scores[i];
//     var li = document.createElement("li");
//     li.textContent = scores;
//     li.setAttribute("data-index", i)
//     li.appendChild(highScores);

//   }
// }
// function renderHighScore(player) {
//     var hsText = x + ". " + player.initials + " - " + player.score;
//     hsList.setAttribute("class", "list-group");
//     highScores.appendChild(hsList);
//     var hsLine = document.createElement("li");
//     hsLine.setAttribute("class", "list-group-item list-group-item-dark");
//     hsList.insertBefore(hsLine, hsList.childNodes[0]);
//     hsLine.innerText = hsText;
// }
function renderHighScore(storedPlayers) {
  for (var i = 0; i < storedPlayers.length; i += 2) {
    var hsText = x + ". " + storedPlayers[i] + " - " + storedPlayers[i+1];;
    hsList.setAttribute("class", "list-group");
    highScores.appendChild(hsList);
    var hsLine = document.createElement("li");
    hsLine.setAttribute("class", "list-group-item list-group-item-dark");
    hsLine.setAttribute("data-index", i);
    hsList.insertBefore(hsLine, hsList.childNodes[0]);
    hsLine.innerText = hsText;
    console.log(storedPlayers.length);
  }
} 


// function findHighScore() {

// }



function clearHSF() {
  localStorage.clear();
}

function goBackF() {
  window.location.replace('/Code_Quiz_NP/index.html');
}

clearHS.addEventListener("click", clearHSF);

goBack.addEventListener("click", goBackF);

init();
