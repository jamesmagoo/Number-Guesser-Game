// 1. Set game variable
// 2. Set up event listners for UI
// 3. Assign game parameters, i.e. max and min Number
// 4. Listen for guess 
// 5. Validate guess
// 6. Feedback result to user and UI

// Game Variables
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI Max & Min
minNum.textContent = min ;
maxNum.textContent = max ;

// Play Again Event Listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});


// Add Event Listeners
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate Guess
    if(isNaN(guess) || guess < min || guess > max ){ 
        // Set Message
        setMessage(`Please enter a number between ${min} & ${max}`, 'orange');
        // Change Border Colour
        guessInput.style.borderColor = 'orange';

    }
    // Check If Winner
    else if( guess === winningNum){
        //Game Over - Winner
        gameOver(true, `WINNER ! ${winningNum} is correct.`);
        guessInput.value = '';

    } else {
        // Wrong Number
        guessesLeft -= 1 ;

        if(guessesLeft === 0 ){
            // Game Over - LOST
            gameOver(false,`LOSER ! ${winningNum} was correct, you're out of guesses.`)
            guessInput.value = '';
    
        } else {
                // Game continues - ANSWER WRONG
                setMessage(`Guess is not correct. ${guessesLeft} guesses left.`,'black')
                // Clear Input
                guessInput.value = '';
                }

    }


});

// Game Over Function
function gameOver(won , msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    
    //Disable Input
    guessInput.disabled = true;
    //Change Text & Border Colour
    guessInput.style.borderColor = color ;
    message.style.color = color ;
    //Set Messsage
    setMessage(msg);
    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// Winning Number Generator
function getRandomNum(min, max){

    const num = Math.floor(Math.random()*(max-min+1)+min);
    //console.log(num);
    return num;
}


// Set Message Function
function setMessage(msg, colour){
    message.style.color = colour;
    message.textContent = msg;
}