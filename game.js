var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Generating Sequence of Color
function nextSequence() {
  userClickedPattern = []; //empty the array of user pattern
  level++; // Increase level
  $("#level-title").text("Level " + level); // Update the h1 with this change in the value of level.
  var randomNumber = Math.floor(Math.random() * 4); //Generate RNG number 0 to 3
  var randomChosenColour = buttonColours[randomNumber]; // A random color is choosen from buttonColours
  gamePattern.push(randomChosenColour); // storing of color pattern

  //Animation Fading in/out to display sequence
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//EventListener for button click
$(".btn").click(function() {
  //using event
  //var userChosenColour = event.target.id;
  var userChosenColour = $(this).attr("id")
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log($input.attr("id"));
  //console.log(userClickedPattern);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});


//Animation for button is pressed
function animatePress(currentColour) {
  var delayInMilliseconds = 100; //100 millisecond
  $("#" + currentColour).addClass("pressed");
  //Timeout function to call after 100ms
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"); // To be executed after 100ms
  }, delayInMilliseconds);

}

//Logic for checking awnser
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //check that player have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence(); // To be executed after 100ms provide the next sequence for player
      }, 1000);
    }
  } else {
    //Game Over
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over"); // To be executed after 200ms
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

//Play sounds for the button press or sequence
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//EventListner keypress to start the game
$(document).keypress(function() {
  //console.log(event.key);
  //Ensure first keypress to start the game
  if (started == false) {
    $("#level-title").text("Level " + level); // Update h1 with Level 0
    nextSequence();
    started = true;
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
