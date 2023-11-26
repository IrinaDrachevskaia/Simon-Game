var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;
var userClickedPattern=[];


function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(num_level) {
  if (gamePattern[num_level-1]!==userClickedPattern[num_level-1]){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text('Game Over, Press "Enter" to Restart');
    startOver();
  }
  else {
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence()}, 1000);
      }
  }
}


$(document).keypress(function(event) {
  if ((event.key === "Enter") && (!started)){
    started = true;
    nextSequence();
  }
});

$("h1").on("click", function() {
  if (!started){
    started = true;
    nextSequence();
  }
});

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length);
  });
