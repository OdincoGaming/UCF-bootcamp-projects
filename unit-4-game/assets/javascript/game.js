//necessary variables
var targetNumber = (Math.floor(Math.random() * 101) + 19);
$("#number-to-guess").text(targetNumber);

var counter = 0;
var counterObj = $("#counter");

var wins = 0;
var losses = 0;
var winsObj = $("#wins");
var lossObj = $("#losses");

var crystalsContainer = $("#crystals");
var crystals = ["purple", "blue", "yellow", "fire"];
var images = ["assets/images/crystal_purple.png", "assets/images/crystal_blue.png", "assets/images/crystal_yellow.png", "assets/images/crystal_fire.png"]
createCrystals();

//create crystals
function createCrystals(){
    for (var i = 0; i < crystals.length; i++) {
        var imageCrystal = $("<img>");
    
        imageCrystal.addClass("crystal-image");
        imageCrystal.attr("src", images[i]);
        imageCrystal.attr("data-crystalvalue", Math.floor(Math.random() * 11) + 1);
    
        crystalsContainer.append(imageCrystal);
    }

    //game logic
    $(".crystal-image").on("click", function() {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    counter += crystalValue;

    counterObj.text(counter);

    if (counter === targetNumber) {
        alert("You win!");
        wins += 1;
        reset();
    }

    else if (counter > targetNumber) {
        alert("You lose!!");
        losses += 1;
        reset();
    }
});
}

function removeCrystals(){
    crystalsContainer.empty();
}

//reset
function reset(){
    targetNumber = (Math.floor(Math.random() * 101) + 19);
    $("#number-to-guess").text(targetNumber);
    counter = 0;
    counterObj.text(counter);
    winsObj.text(wins);
    lossObj.text(losses);
    removeCrystals();
    createCrystals();
}

