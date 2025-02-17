 const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];

// Possible outcomes (row, columns and diagonals both sides)
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
            }, 100);
            return;
        }

        if (checkTie()) {
            setTimeout(() => {
                alert('Game is tied!');
                restartGame();
            }, 100);
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    });
}

function checkWin(currentPlayer) {
    return winning_combinations.some(([a, b, c]) => 
        squares[a].textContent === currentPlayer &&
        squares[b].textContent === currentPlayer &&
        squares[c].textContent === currentPlayer
    );
}

function checkTie() {
    return [...squares].every(square => square.textContent !== '');
}

function restartGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }
    currentPlayer = players[0];
}

// Event listener for the restart button
document.getElementById('restartButton').addEventListener('click', restartGame);
