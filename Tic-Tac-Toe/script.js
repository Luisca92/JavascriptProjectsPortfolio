
//  These lines of code set up the basic variables. currentPlayer will alternate between 'X' and 'O', 
// gameBoard is an array representing our 3x3 grid, and gameActive indicates if the game is ongoing.

let currentPlayer = 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 game board
let gameActive = true;

// Now, let's write a function to handle player turns. 
// This function will update the game board and then switch to the other player.

function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// This function checks if the clicked cell is empty and the game is active. If
// so, it sets the cell to the current player's symbol and switches players.

// In this step, we will take our Tic-Tac-Toe game to the next level by implementing player interactions. 

// We'll add event listeners to the game board, allowing players to click on cells to make their moves. 
// Additionally, we'll update the game state and UI in response to these actions. 
// Let's start making our game board responsive to player inputs!

const cells = document.querySelectorAll('.cell')

// Now, we'll add an event listener to each cell. This listener will call a function when a cell is clicked.

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false)
})

// We’ll then create a cellClicked function to handle the logic when a cell is clicked.
// It will check the cell index, update the game state, and refresh the UI.


// In this function, we:

//     Get the clicked cell and its index.
//     Check if the cell is already taken or if the game is inactive.
//     If not, we call handlePlayerTurn to update the game state and updateUI to reflect these changes on the board.

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handlePlayerTurn(clickedCellIndex);
    updateUI()
}

// After each turn, we need to update the game board to show the players' moves. Let's write the updateUI function.
// This function updates each cell with the corresponding value in the gameBoard array,
// effectively displaying the Xs and Os on the board.

function updateUI() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
}

// In this step, we'll write the necessary code to check for win conditions after each move and
//  display appropriate messages when a player wins, or the game ends in a draw. 

// First, let's define the possible winning combinations on the Tic-Tac-Toe board.
// We can represent these as an array of arrays, where each inner array represents a winning line (row, column, or diagonal).

const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
  ];

// Next, we need a function to check after each move whether the current player has won or if the game is a draw. 
// We'll call this function after each turn in the handlePlayerTurn function.


// In this function, we:

// Check each winning condition to see if the current player has a winning combination.
// Declare a winner if a winning combination is found.
// Check for a draw if no spaces are left and no winner is declared.

function checkForWinOrDraw(){
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] == gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
}

// These functions will update the UI to inform players of the game's outcome.

function announceWinner(player){
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw() {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Game Draw!';
}