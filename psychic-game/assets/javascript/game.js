var wins = 0;
var losses = 0;
var computerGuess = '';
var playerGuess = '';
var guessesMade = [];
var guessesLeft = 10;
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

var winsText = document.getElementById("wins");
var lossText = document.getElementById("losses");
var remainingText = document.getElementById("remaining-guesses");
var guessesText = document.getElementById("guesses-made");

reset();

document.onkeyup = function(event){
    playerGuess = event.key.toLowerCase();
    guessesMade.push(playerGuess);
    guessesLeft -= 1;
    if(playerGuess == computerGuess){
        win();
    } else if (guessesLeft < 1){
        loss();
    }
    writePage();

}

function reset(){
    computerGuess = setComputerGuess();
    playerGuess = '';
    guessesLeft = 10;
    guessesMade = [];
    writePage();
}

function loss(){
    losses += 1;
    alert("You lose! The answer was " + computerGuess);
    reset();
}

function win(){
    wins += 1;
    alert(playerGuess + " was the correct answer, you win!");
    reset();
}

function setComputerGuess(){
    var guess = alphabet[Math.floor(Math.random() * alphabet.length)];
    return guess;
}

function writePage(){
    winsText.textContent = "Wins: " + wins;
    lossText.textContent = "Losses: " + losses;
    remainingText.textContent = "Remaining Guesses: " + guessesLeft;
    guessesText.textContent = "Guesses Made: " + guessesMade;
}