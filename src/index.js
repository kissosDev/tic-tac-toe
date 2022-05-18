function initiateBoard() {
  let board = [];
  for (let index = 0; index < 9; index++) {
    board.push(-1);
  }
  return board;
}

function getCurrentPlayerMarker(currentPlayer) {
  if (currentPlayer) return "X"; // if currentPlayer is 0 this will evaluate to false
  return "O";
}

// const turnToMarkerDict = {
//   1: 'X',
//   0: 'O'
// };

function isSelectedpositionValid(board, selectedPosition) {
  if (board[selectedPosition] !== -1) return false;
  return true;
}

function updateBoardAccordingToPlayerChoice(
  board,
  currentPlayer,
  selectedPosition
) {
  const marker = getCurrentPlayerMarker(currentPlayer);
  // const marker = turnToMarkerDict[currentPlayer];
  board[selectedPosition] = marker;
}

function switchPlayerTurn(currentPlayer) {
  if (getCurrentPlayerMarker(currentPlayer)) {
    gameData.playerTurn = false;
  }
  gameData.playerTurn = true;
}

function isBoardFull(board) {
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== -1) {
      count++;
    }
  }
  if (count === 9) {
    return true;
  }
  return false;
}

function isGameOver(board, currentPlayer) {
  const marker = getPlayerMarker(currentPlayer);
  for (let i = 0; i < 6; i += 3) {
    if (
      board[i] === marker &&
      board[i + 1] === marker &&
      board[i + 2] === marker
    )
      return true;
  }
  for (let i = 0; i < 3; i++) {
    if (
      board[i] === marker &&
      board[i + 3] === marker &&
      board[i + 6] === marker
    ) {
      return true;
    }
  }
  if (board[0] === marker && board[4] === marker && board[8] === marker)
    return true;
  if (board[2] === marker && board[4] === marker && board[6] === marker)
    return true;
  if (isBoardFull()) return true;
  return false;
}

function getUserLocation() {
  const location = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  let userInput = prompt("Pick location from 0-8");
  if (!location.includes(userInput)) {
    console.log("Invalid value has been given please chose other one");
    userInput = getUserInput();
  }

  return parseInt(userInput);
}

function winnerDeclaration(board, currentPlayer) {
  if (currentPlayer) {
    return console.log("player 1 is the winner!");
  } else {
    return console.log("player 2 is the winner!");
  }
}
function main() {
  initiateBoard();
  const gameData = {
    playerTurn: true,
  };
  let currentPlayer = gameData.playerTurn; // DOM
  let currentMarker = getCurrentPlayerMarker(currentPlayer);
  let selectedPosition = getUserLocation(); //DOM
  do {
    while (!isSelectedpositioValid) {
      selectedPosition = getUserLocation(); //DOM
    }
    updateBoardAccordingToPlayerChoice(board, currentPlayer, selectedPosition);
    currentPlayer = switchPlayerTurn(currentPlayer);
  } while (!isGameOver(board, currentPlayer));
  currentPlayer = switchPlayerTurn(currentPlayer);
  if (isBoardFull) return console.log("it's a draw!");
  else winnerDeclaration(board, currentPlayer);
}
