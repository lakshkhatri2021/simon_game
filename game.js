
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

// when a key is pressed,starting the game 
$(document).keypress(function () {
    if (!started) {
        // the next line is there to show 'level 0'
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    // obtaining the color that was clicked by the user and appending that in a list 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

    userClickedPattern = [];

    level++;
    // this time its there to show the coming levels 1 2 3....
    $("#level-title").text("Level " + level);

    // creating the pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // method to show the fading new pattern 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour);
}

// audio of clicking the colors
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100); // the time is in ms
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");

    }
    if (userClickedPattern.length === gamePattern.length) {

        setTimeout(function () {
            nextSequence();
        }, 1000);
    }


    else {

        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

// restarting the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}