var hsList = document.createElement("ul");
var highScores = document.querySelector("#high-scores");
var clearHS = document.querySelector('#clearHS-button');
var goBack = document.querySelector('#goBack-button');
var storedPlayers = [];
var oldPlayers = JSON.parse(localStorage.getItem("oldPlayers"));

function init() {
  var newInitials = JSON.parse(localStorage.getItem("initials"));
  var newScores = JSON.parse(localStorage.getItem("score"));
  if (newInitials !== null) {
    initials = newInitials;
  }
  if (newScores !== null) {
    score = newScores;
  }
  var player = {
    initials: newInitials,
    score: newScores
  };
  if (player.initials !== null && player.score !== null) {
    storedPlayers.push(player.initials,player.score);
  }
  if (oldPlayers === null && storedPlayers === null) {
    localStorage.setItem("oldPlayers", JSON.stringify(storedPlayers));
  } else if (oldPlayers !== null) {
      oldPlayers = JSON.parse(localStorage.getItem("oldPlayers"));
    for (var i = 0; i < oldPlayers.length; i++) {
      storedPlayers.push(oldPlayers[i]);
    }
    oldPlayers.push(storedPlayers[0],storedPlayers[1]);
    localStorage.setItem("oldPlayers", JSON.stringify(oldPlayers));
  }                    
  if (storedPlayers !== null) {
    renderHighScore(storedPlayers);
  }
}

function renderHighScore(arr) {
  for (var i = 0; i < arr.length; i += 2) {
    var hsText = arr[i] + " - " + arr[i+1];
    hsList.setAttribute("class", "list-group");
    highScores.appendChild(hsList);
    var hsLine = document.createElement("li");
    hsLine.setAttribute("class", "list-group-item list-group-item-dark");
    hsLine.setAttribute("data-index", i);
    hsList.insertBefore(hsLine, hsLine.childNodes[0]);
    hsLine.innerText = hsText;
  }
} 

function clearHSF() {
  localStorage.clear();
  var a = document.getElementById("high-scores");
  if (a) {
    a.remove();
  }
}

function goBackF() {
  window.location.replace('/Code_Quiz_NP/index.html');
}

clearHS.addEventListener("click", clearHSF);
goBack.addEventListener("click", goBackF);
init();
