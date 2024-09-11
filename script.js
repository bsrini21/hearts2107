// script.js

const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.getElementById("best-score");
const gameOverDisplay = document.getElementById("game-over");
let grid = [];
let score = 0;
let bestScore = 0;
const size = 4;
const heartEmojis = ['❤️', '💛', '💚', '💙', '💜', '🖤', '💘', '💝', '💕', '🌈', '🦄']; // Updated heart levels with cute hearts

// Initialize the grid
function initGrid() {
    grid = [];
    score = 0;
    scoreDisplay.innerText = score;
    gameOverDisplay.style.display = 'none';
    gridContainer.innerHTML = '';  // Clear previous tiles
    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-value', '0');
        tile.innerText = '';
        grid.push(tile);
        gridContainer.appendChild(tile);
    }
    addNewTile();
    addNewTile();
}

// Add new tile with heart
function addNewTile() {
    const emptyTiles = grid.filter(tile => tile.getAttribute('data-value') === '0');
    if (emptyTiles.length === 0) return; // No space left for new tile
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.setAttribute('data-value', '2');
    randomTile.innerText = heartEmojis[0]; // ❤️
}

// Update Score
function updateScore(value) {
    score += value;
    scoreDisplay.innerText = score;
    if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.innerText = bestScore;
    }
}

// Merge tiles and handle swipe logic
function move(direction) {
    let moved = false;
    if (direction === 'left') {
        for (let i = 0; i < size; i++) {
            let row = grid.slice(i * size, (i + 1) * size);
            moved = slideAndMerge(row) || moved;
        }
    } else if (direction === 'right') {
        for (let i = 0; i < size; i++) {
            let row = grid.slice(i * size, (i + 1) * size).reverse();
            moved = slideAndMerge(row) || moved;
        }
    } else if (direction === 'up') {
        for (let i = 0; i < size; i++) {
            let col = [];
            for (let j = 0; j < size; j++) {
                col.push(grid[i + j * size]);
            }
            moved = slideAndMerge(col) || moved;
        }
    } else if (direction === 'down') {
        for (let i = 0; i < size; i++) {
            let col = [];
            for (let j = 0; j < size; j++) {
                col.push(grid[i + j * size]);
            }
            moved = slideAndMerge(col.reverse()) || moved;
        }
    }

    if (moved) {
        addNewTile();
        if (checkGameOver()) {
            gameOver();
        }
    }
}

// Slide and merge the tiles in a row or column
function slideAndMerge(line) {
    let moved = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i].getAttribute('data-value') === '0') {
            for (let j = i + 1; j < line.length; j++) {
                if (line[j].getAttribute('data-value') !== '0') {
                    line[i].setAttribute('data-value', line[j].getAttribute('data-value'));
                    line[i].innerText = line[j].innerText;
                    line[j].setAttribute('data-value', '0');
                    line[j].innerText = '';
                    moved = true;
                    break;
                }
            }
        }
    }
    for (let i = 0; i < line.length - 1; i++) {
        if (line[i].getAttribute('data-value') === line[i + 1].getAttribute('data-value') && line[i].getAttribute('data-value') !== '0') {
            let newValue = parseInt(line[i].getAttribute('data-value')) * 2;
            line[i].setAttribute('data-value', newValue);
            line[i].innerText = heartEmojis[Math.log2(newValue) - 1];
            line[i + 1].setAttribute('data-value', '0');
            line[i + 1].innerText = '';
            updateScore(newValue);
            moved = true;
        }
    }
    for (let i = 0; i < line.length; i++) {
        if (line[i].getAttribute('data-value') === '0') {
            for (let j = i + 1; j < line.length; j++) {
                if (line[j].getAttribute('data-value') !== '0') {
                    line[i].setAttribute('data-value', line[j].getAttribute('data-value'));
                    line[i].innerText = line[j].innerText;
                    line[j].setAttribute('data-value', '0');
                    line[j].innerText = '';
                    moved = true;
                    break;
                }
            }
        }
    }
    return moved;
}

// Check if the game is over
function checkGameOver() {
    const emptyTiles = grid.filter(tile => tile.getAttribute('data-value') === '0');
    if (emptyTiles.length > 0) return false;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 1; j++) {
            if (grid[i * size + j].getAttribute('data-value') === grid[i * size + j + 1].getAttribute('data-value')) return false;
            if (grid[j * size + i].getAttribute('data-value') === grid[(j + 1) * size + i].getAttribute('data-value')) return false;
        }
    }
    return true;
}

// Game Over Display
function gameOver() {
    gameOverDisplay.style.display = 'block';
}

// Restart Game
function restartGame() {
    initGrid();
}

// Start the game immediately on load
window.onload = () => {
    initGrid();
};

    scoreDisplay.innerText = score;
    if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.innerText = bestScore;
    }
}

// Merge tiles and handle swipe logic
function move(direction) {
    let moved = false;
    if (direction === 'left') {
        for (let i = 0; i < size; i++) {
            let row = grid.slice(i * size, (i + 1) * size);
            moved = slideAndMerge(row) || moved;
        }
    } else if (direction === 'right') {
        for (let i = 0; i < size; i++) {
            let row = grid.slice(i * size, (i + 1) * size).reverse();
            moved = slideAndMerge(row) || moved;
        }
    } else if (direction === 'up') {
        for (let i = 0; i < size; i++) {
            let col = [];
            for (let j = 0; j < size; j++) {
                col.push(grid[i + j * size]);
            }
            moved = slideAndMerge(col) || moved;
        }
    } else if (direction === 'down') {
        for (let i = 0; i < size; i++) {
            let col = [];
            for (let j = 0; j < size; j++) {
                col.push(grid[i + j * size]);
            }
            moved = slideAndMerge(col.reverse()) || moved;
        }
    }

    if (moved) {
        addNewTile();
        if (checkGameOver()) {
            gameOver();
        }
    }
}

// Slide and merge the tiles in a row or column
function slideAndMerge(line) {
    let moved = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i].getAttribute('data-value') === '0') {
            for (let j = i + 1; j < line.length; j++) {
                if (line[j].getAttribute('data-value') !== '0') {
                    line[i].setAttribute('data-value', line[j].getAttribute('data-value'));
                    line[i].innerText = line[j].innerText;
                    line[j].setAttribute('data-value', '0');
                    line[j].innerText = '';
                    moved = true;
                    break;
                }
            }
        }
    }
    for (let i = 0; i < line.length - 1; i++) {
        if (line[i].getAttribute('data-value') === line[i + 1].getAttribute('data-value') && line[i].getAttribute('data-value') !== '0') {
            let newValue = parseInt(line[i].getAttribute('data-value')) * 2;
            line[i].setAttribute('data-value', newValue);
            line[i].innerText = heartEmojis[Math.log2(newValue) - 1];
            line[i + 1].setAttribute('data-value', '0');
            line[i + 1].innerText = '';
            updateScore(newValue);
            moved = true;
        }
    }
    for (let i = 0; i < line.length; i++) {
        if (line[i].getAttribute('data-value') === '0') {
            for (let j = i + 1; j < line.length; j++) {
                if (line[j].getAttribute('data-value') !== '0') {
                    line[i].setAttribute('data-value', line[j].getAttribute('data-value'));
                    line[i].innerText = line[j].innerText;
                    line[j].setAttribute('data-value', '0');
                    line[j].innerText = '';
                    moved = true;
                    break;
                }
            }
        }
    }
    return moved;
}

// Check if the game is over
function checkGameOver() {
    const emptyTiles = grid.filter(tile => tile.getAttribute('data-value') === '0');
    if (emptyTiles.length > 0) return false;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 1; j++) {
            if (grid[i * size + j].getAttribute('data-value') === grid[i * size + j + 1].getAttribute('data-value')) return false;
            if (grid[j * size + i].getAttribute('data-value') === grid[(j + 1) * size + i].getAttribute('data-value')) return false;
        }
    }
    return true;
}

// Game Over Display
function gameOver() {
    gameOverDisplay.style.display = 'block';
}

// Restart Game
function restartGame() {
    initGrid();
}

// Start the game immediately on load
window.onload = () => {
    initGrid();
};
