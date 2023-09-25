// game.js


var userClickedPattern = [];
var gamePattern = [];
var level = null;
var clickCounter = 0;
var highScoresTable = document.getElementById("highScores");
var gameContainer = document.getElementById("game");
var header = document.getElementById("level-title");
var leaderboardBtn = document.getElementById("leaderboardBtn");
var invalidClicks = 0;
var startBtn = document.getElementById("startBtn");

$(document).ready(function () {
    debugger;
    startBtn.hidden = true;

    if(window.mobileCheck == true){
        startBtn.hidden = false;
        header.innerHTML = "Simon";
    } else {
        document.addEventListener("keypress", function () {        
            
        startGame();
            
    });
    }
    highScoresTable.hidden = true;
    const scores = loadScores(); // Load the top scores from localStorage

    if(scores.length === 0){
        leaderboardBtn.hidden = true;
    } else {
        leaderboardBtn.hidden = false;
    }

    

    $(".btn").click(function (e) {
        if(level != null){

            var color = e.currentTarget.id;
            var userChosenColour = color;
            userClickedPattern.push(userChosenColour);

            if(gamePattern[clickCounter] != userClickedPattern[clickCounter]){
                level--;
                gameOver(color);

            } 
            else if (gamePattern[clickCounter] == userClickedPattern[clickCounter]) {

                clickCounter++;
                animatePress(color);
                playSound(color);
                
                if(clickCounter === gamePattern.length) {
                    clickCounter = 0;
                    console.log("My pattern: " + userClickedPattern);
                    userClickedPattern = [];
                    var btns = document.querySelectorAll(".btn");

                    btns.forEach(btn => {
                        btn.style.pointerEvents = 'none';
                      });
                    
                    setTimeout(function (){
                        nextSequence();

                        btns.forEach(btn => {
                            btn.style.pointerEvents = 'auto';
                          });
                        
                    }, 1500);
                } ;
            } 

        }
        
        
    });
});

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

function startGame(){

    setTimeout(function () {

        if(level === null) {
            console.clear();
            updateLevel();
            nextSequence();
        }

    }, 1000);
}

function pressedStart() {
    debugger;
    var btn = $("#startBtn");
    btn.addClass("pressed");
    btn.removeClass("pressed");
    btn.removeClass("enabledStart");
    btn.addClass("disabledStart");
    startGame();
}

function nextSequence() {
    
    var randomNumber = Math.floor(Math.random() * 4);
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    console.clear();
    console.log("Game pattern: " + gamePattern);

    updateLevel();
}

function playSound(color) {

    audio = new Audio('sounds/' + color + ".mp3");
    audio.play();
}

function animatePress(color, gameOver) {
    
    var id = "#" + color;
    var button = $(id);
    if(gameOver == true){
        button.addClass("game-over");
    } else {
        button.addClass("pressed");

        setTimeout(function () {
            button.removeClass("pressed");
        }, 100)
    }
    
}

function updateLevel() {

    var header = $("#level-title");

    if(level === null){
        level = 0;
        header.html("Level " + level);
    } else {
        header.html("Level " + level++);
    }
}

function updateHeader(gameOver) {

    var header = $("#level-title");

    if(gameOver === true){
        level = 0;
        header.html("Game Over! :(");
    } else {
        header.html("Press A Key to Start");
    }
}



function gameOver(color){
    var levelReached = level;

    playSound("wrong");
    animatePress(color, true);
    updateHeader(true);
    
    clickCounter = 0;
    level = null;
    userClickedPattern = [];
    gamePattern = [];

    setTimeout(function () {
        var scores = loadScores();
        scores.sort((a, b) => b.level - a.level); // Sort scores by level in ascending order
        const top5Scores = scores.slice(0, 5); // Get the top 5 scores

        if((scores.length < 5 || levelReached > top5Scores[4].level) && levelReached > 0) {
            var player = prompt("You made it to the leaderboard! Please enter your name:");
            var date = new Date();

            if(player.length > 0 && player != null){
                addScore(levelReached, player, formatDate(date));
            leaderboardBtn.hidden = false;
            }
        }

    }, 1000);
    

    setTimeout(function () {
        updateHeader(false);
        $(".btn").removeClass("game-over");
        $("#startBtn").removeClass("disabledStart");
        $("#startBtn").addClass("enabledStart");
    }, 2000);
}

function ScoreEntry(level, playerName, date) {
    this.level = level;
    this.playerName = playerName;
    this.date = date;
  }
  

function loadScores() {
    const savedScores = localStorage.getItem('scores');
    return savedScores ? JSON.parse(savedScores) : [];
}

function addScore(level, playerName, date) {
    const newScore = new ScoreEntry(level, playerName, date);
    const scores = loadScores();
    scores.push(newScore);
    scores.sort((a, b) => b.level - a.level); // Sort scores by level in ascending order
    const top5Scores = scores.slice(0, 5); // Get the top 5 scores
    localStorage.setItem('scores', JSON.stringify(top5Scores)); // Save to localStorage
    // displayTopScores();
  }


  function displayTopScores() {
    const scoreTableBody = document.getElementById('scoreTableBody');
    const scores = loadScores(); // Load the top scores from localStorage

    if(scores.length === 0){
        highScoresTable.hidden = true;
    } else {
        highScoresTable.hidden = false;
    }
    
    // Sort scores by level in descending order
    scores.sort((a, b) => b.level - a.level);

    // Clear the table body before adding new entries
    scoreTableBody.innerHTML = '';
    
    var rank = 1;
    // Loop through the top scores and create table rows
    scores.forEach((score, index) => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${rank}</td>
        <td>${score.playerName}</td>
        <td>${score.level}</td>
        <td>${score.date}</td>
      `;
      scoreTableBody.appendChild(row);
      rank++;
    });
  }

  function deleteScores(){
    localStorage.removeItem('scores');
    location.reload();
  }

  function toggleLeaderboard() {
    var btn = document.getElementById("leaderboardBtn");
    if(highScoresTable.hidden === true){
        displayTopScores();
        gameContainer.hidden = true;
        header.innerText = "Leaderboard";
        btn.innerHTML = "Back to game"
    } else {
        highScoresTable.hidden = true;
        gameContainer.hidden = false;
        header.innerText = "Press A Key to Start";
        btn.innerHTML = "Leaderboard";
    }
  }

  function formatDate(date){
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    const shortDate = date.toLocaleDateString(undefined, dateOptions);
    const shortTime = date.toLocaleTimeString(undefined, timeOptions);

    const shortDateTime = `${shortDate} ${shortTime}`;
    return shortDateTime;
  }
    
  
  



