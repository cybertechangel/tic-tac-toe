const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const gameElement = document.getElementById('game');
const modeSelection = document.getElementById('mode-selection');
const aiLevelDiv = document.getElementById('ai-levels');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameMode = 'human';
let gameActive = true;

function showAILevels() {
  aiLevelDiv.classList.remove('hidden');
}

function startGame(mode) {
  gameMode = mode;
  document.getElementById('intro-image').classList.add('hidden');
  modeSelection.classList.add('hidden');
  aiLevelDiv.classList.add('hidden');
  gameElement.classList.remove('hidden');

  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  messageElement.textContent = '';
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleMove(index));
    boardElement.appendChild(cellElement);
  });
}

function handleMove(index) {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWin(currentPlayer)) {
    messageElement.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (board.every(cell => cell !== '')) {
    messageElement.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (gameMode.startsWith('ai') && currentPlayer === 'O') {
    setTimeout(() => aiMove(), 500);
  }
}

function aiMove() {
  let move;

  if (gameMode === 'ai-easy') {
    move = getRandomMove();
  } else if (gameMode === 'ai-medium') {
    move = getBlockingMove('X') ?? getRandomMove();
  } else if (gameMode === 'ai-hard') {
    move = minimax(board, 'O').index;
  }

  if (move !== undefined) handleMove(move);
}

function getRandomMove() {
  const empty = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}

function getBlockingMove(opponent) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O'; // simulate AI win
      if (checkWin('O')) {
        board[i] = '';
        return i;
      }
      board[i] = opponent; // simulate opponent win
      if (checkWin(opponent)) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }
  return null;
}

function minimax(newBoard, player) {
  const availSpots = newBoard.map((v, i) => v === '' ? i : null).filter(v => v !== null);

  if (checkWin('X')) return { score: -10 };
  if (checkWin('O')) return { score: 10 };
  if (availSpots.length === 0) return { score: 0 };

  const moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    const move = {};
    move.index = availSpots[i];
    newBoard[availSpots[i]] = player;

    if (player === 'O') {
      const result = minimax(newBoard, 'X');
      move.score = result.score;
    } else {
      const result = minimax(newBoard, 'O');
      move.score = result.score;
    }

    newBoard[availSpots[i]] = '';
    moves.push(move);
  }

  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

function checkWin(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(combo => combo.every(i => board[i] === player));
}

function resetGame() {
  document.getElementById('intro-image').classList.remove('hidden');
  gameElement.classList.add('hidden');
  modeSelection.classList.remove('hidden');
  aiLevelDiv.classList.add('hidden');
}
