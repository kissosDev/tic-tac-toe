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
