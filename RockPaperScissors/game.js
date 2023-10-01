function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    
    switch(choice) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }
}

function playRound(playerSelection, computerSelection) {
    player = playerSelection.trim().toLowerCase();
    computer = computerSelection.trim().toLowerCase();

    if (player == computer) {
        return "0It is a tie!";
    }
    else if (player == "rock") {
        if (computer == "paper") {
            return "2You lost. Paper beats rock."
        }
        else if (computer == "scissors") {
            return "1You win! Rock beats scissors."
        }
        else {
            return "0The computer didn't choose Rock, Paper, or Scissors."
        }
    }
    else if (player == "paper") {
        if (computer == "scissors") {
            return "2You lost. Scissors beats paper."
        }
        else if (computer == "rock") {
            return "1You win! Paper beats rock."
        }
        else {
            return "0The computer didn't choose Rock, Paper, or Scissors."
        }
    }
    else if (player == "scissors") {
        if (computer == "rock") {
            return "2You lost. Rock beats paper."
        }
        else if (computer == "paper") {
            return "1You win! Scissors beats paper."
        }
        else {
            return "0The computer didn't choose Rock, Paper, or Scissors."
        }
    }
    else {
        return "0Please choose Rock, Paper, or Scissors."
    }
}

function playGame() {
    console.log("Let's play Rock Paper Scissors!\nBest out of 5!");
    let playerScore = 0;
    let computerScore = 0;
    
    for (let i = 0; i < 5; i++) {
        console.log(`\nRound ${i+1}:`)
        let playerSelection = prompt("Choose rock, paper, or scissors: ").trim().toLowerCase();

        let result = playRound(playerSelection, getComputerChoice())

        if (result.charAt(0) === 0) {

        }
        else if (result.charAt(0) === 1) {
            playerScore++;
        }
        else if (result.charAt(0) === 2) {
            computerScore++;
        }

        console.log(result.substring(1));
    }

    console.log("\nMatch Results\n------------")
    let message;
    if (playerScore > computerScore) {
        message = "Congratulations, you won!"
    }
    else if (computerScore > playerScore) {
        message = "Too bad, better luck next time!"
    }
    else {
        message = "Wow! It's a tie!"
    }
    console.log(message)
}

const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
const resultArea = document.querySelector('#result');
let playerScore = 0;
let computerScore = 0;

rockButton.addEventListener('click', () => {
    result = playRound('rock', getComputerChoice());
    resultArea.textContent = 
});

paperButton.addEventListener('click', () => {
    resultArea.textContent = playRound('paper', getComputerChoice());
});

scissorsButton.addEventListener('click', () => {
    resultArea.textContent = playRound('scissors', getComputerChoice());
});