// GAME STATUS
const DRAW = "draw";
const CURRENT_PLAYER_WON = "currentPlayerWon";
const ONGOING = "ongoing";
let board = getNewBoard();
let currentPlayer = true;
highlightPlayerTurn();
const cellElements = document.querySelectorAll(".box");
// let index = 0;
cellElements.forEach((cell, index) => {
  cell.setAttribute("position", index);
  // index++;
  cell.addEventListener("click", handleClick);
});
const restartButton = document.querySelector("#restart_Game");
restartButton.addEventListener("click", restartGame);

function handleClick(event) {
  // placeMark(cell, currentMarker);
  const clickedPosition = event.target.getAttribute("position");
  handleCurrentTurn(clickedPosition);
  updateUI();
}

function updateUI() {
  placeMarker();
  highlightPlayerTurn();
}

function placeMarker() {
  // for (let i = 0; i < 9; i++) {
  //   if (board[i] === -1) continue;

  //   cellElements[i].innerHTML = board[i];
  // }

  board.forEach((element, index) => {
    cellElements[index].innerHTML = element === -1 ? "" : element;
  });
}

function highlightPlayerTurn() {
  const playerO = document.querySelector(
    ".dashboard-container .dashboard-layout .playerO div"
  );
  const playerX = document.querySelector(
    ".dashboard-container .dashboard-layout .playerX div"
  );
  if (!currentPlayer) {
    playerO.setAttribute("style", "font-weight: 800");
    playerX.setAttribute("style", "font-weight: 400");
  } else {
    playerX.setAttribute("style", "font-weight: 800");
    playerO.setAttribute("style", "font-weight: 400");
  }
}

function handleCurrentTurn(selectedPosition) {
  if (!isAvailable(selectedPosition)) return; //update
  board[selectedPosition] = getCurrentPlayerMarker();
  console.log(board);
  const currentStatus = getCurrentGameStatus();
  if (currentStatus === ONGOING) {
    currentPlayer = !currentPlayer;
    return;
  }
  if (currentStatus === CURRENT_PLAYER_WON) {
    declareWinner();
    return;
  }
  if (currentStatus === DRAW) {
    console.log("Its a draw");
    return;
  }
}

function getNewBoard() {
  const board = [];
  for (let index = 0; index < 9; index++) {
    board.push(-1);
  }
  return board;
}

function getCurrentPlayerMarker() {
  return currentPlayer ? "X" : "O";
}

const isAvailable = (position) => board[position] === -1;

function getCurrentGameStatus() {
  function shouldWin(i, j, k) {
    const x = board[i];
    const y = board[j];
    const z = board[k];
    if ([x, y, z].includes(-1)) return false;
    return x === y && y === z;
  }

  for (let i = 0; i < 7; i += 3) {
    if (shouldWin(i, i + 1, i + 2)) return CURRENT_PLAYER_WON;
  }

  for (let i = 0; i < 3; i++) {
    if (shouldWin(i, i + 3, i + 6)) return CURRENT_PLAYER_WON;
  }
  if (shouldWin(0, 4, 8)) return CURRENT_PLAYER_WON;
  if (shouldWin(2, 4, 6)) return CURRENT_PLAYER_WON;
  // both players did not win
  return board.includes(-1) ? ONGOING : DRAW;
}

function declareWinner() {
  let winner = currentPlayer ? "1" : "2";
  console.log(`player ${winner} is the winner!`);
}

function restartGame() {
  board = getNewBoard();
  placeMarker();
  currentPlayer = true;
}
