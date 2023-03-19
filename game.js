var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var isFirstTime = true;
var isCorrect = false;
var level = 0;
var count = 0;

$(document).keydown(function (event) {
  if (isFirstTime) {
    nextSequence();
    $("h1").text("Level " + level);
  }
  isFirstTime = false;
});

$(".btn").click(function () {
  Handler(this.id);
});

function Handler(id) {
  var userChosenColour = id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (
    userClickedPattern[userClickedPattern.length - 1] ===
    gamePattern[userClickedPattern.length - 1]
  ) {
    count++;
  } else {
    gameOver();
  }

  if (count === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }

  console.log("user Clicked Pattern: " + userClickedPattern);
}

function nextSequence() {
  count = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  console.log("Game Pattern : " + gamePattern);
}

function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  audio.play();
  $("h1").text("Game Over, Press Any Key to Restart");
  level = 0;
  isFirstTime = true;
  gamePattern = [];
  userClickedPattern = [];
}
