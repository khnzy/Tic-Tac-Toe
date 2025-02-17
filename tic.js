const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];

// Possible outcomes (row,columns and diaginal both side)
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '') return;
        
        squares[i].textContent = currentPlayer;

        // Check for a winner or tie after updating the square
        if (checkWin(currentPlayer)) {
            setTimeout(() => {
                alert(`Game over! ${currentPlayer} wins!`);
                restartGame();
            });
            return;
        }

        if (checkTie()) {
            setTimeout(() => {
                alert('Game is tied!');
                restartGame();
            }); 
            return;
        }

    
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    });
}

function checkWin(currentPlayer) {
    return winning_combinations.some(([a, b, c]) => squares[a].textContent === currentPlayer &&
        squares[b].textContent === currentPlayer &&squares[c].textContent === currentPlayer
    );
}

// Tie
function checkTie() {
    return [...squares].every(square => square.textContent !== '');
}

// restart
function restartGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }
    currentPlayer = players[0];
}

document.getElementById('restartButton').addEventListener('click', restartGame);

document.getElementById('nightModeButton').addEventListener('click', () => {
    const body = document.body;
    const board = document.getElementById('board');
    const squares = document.getElementsByClassName('square');

    // Toggle night mode by adding/removing the 'night-mode' class
    body.classList.toggle('night-mode');
    board.classList.toggle('night-mode');

    // Toggle night mode for all squares
    for (let square of squares) {
        square.classList.toggle('night-mode');
    }
});
