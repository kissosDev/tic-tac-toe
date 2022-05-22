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

function updateBoardAccordingToPlayerChoice(
  board,
  currentPlayer,
  selectedPosition
) {
  const marker = getCurrentPlayerMarker(currentPlayer);
  // const marker = turnToMarkerDict[currentPlayer];
  board[selectedPosition] = marker;
}

// function switchPlayerTurn(currentPlayer, gameData) {

//     if (getCurrentPlayerMarker(currentPlayer) === "X") {
//         gameData.playerTurn = false;
//     }
//     gameData.playerTurn = true;

// gameData.playerTurn = !gameData.playerTurn;
// }
function switchPlayerTurn(gameData) {
  gameData.playerTurn = !gameData.playerTurn;
  return gameData.playerTurn;
}
function isBoardFull(board) {
  return !board.includes(-1);
}

function isGameOver(board) {
  function shouldWin(i, j, k) {
    const x = board[i];
    const y = board[j];
    const z = board[k];
    if ([x, y, z].includes(-1)) return false;
    return x === y && y === z;
  }

  for (let i = 0; i < 6; i += 3) {
    if (shouldWin(i, i + 1, i + 2)) return true;
  }

  for (let i = 0; i < 3; i++) {
    if (shouldWin(i, i + 3, i + 6)) return true;
  }
  if (shouldWin(0, 4, 8)) return true;
  if (shouldWin(2, 4, 6)) return true;
  // both players did not win
  return !board.includes(-1);
}

function getUserLocation() {
  let userInput = prompt(
    "Pick location from 0-8 or q to exit game"
  ).toLowerCase();
  if (userInput === "q") return userInput;

  const location = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  if (location.includes(userInput)) return parseInt(userInput);

  console.log("Invalid value has been given please choose other one");
  return getUserLocation();
}

// function getPositionFromUser() {
//   let userInput = 42;
//   const location = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "q"];
//   while (!location.includes(userInput)) {
//     userInput = prompt("salooo").toLowerCase();
//   }
//   if (userInput === "q") return userInput;
//   return parseInt(userInput);
// }

function declareWinner(currentPlayer) {
  let winner = currentPlayer ? "1" : "2";
  console.log(`player ${winner} is the winner!`);
}

function main() {
  const board = initiateBoard();
  const isAvailable = (position) => board[position] === -1;
  const gameData = {
    playerTurn: true,
  };
  let currentPlayer = gameData.playerTurn; // DOM
  let currentMarker = getCurrentPlayerMarker(currentPlayer);
  let selectedPosition = 10; //DOM

  while (!isGameOver(board)) {
    while (true) {
      selectedPosition = getUserLocation();
      if (selectedPosition === "q") {
        console.log("Game is over bitch");
        return;
      }
      if (isAvailable(selectedPosition)) break;
      console.log("This postion is already taken");
    }

    updateBoardAccordingToPlayerChoice(board, currentPlayer, selectedPosition);
    currentPlayer = switchPlayerTurn(gameData);
    currentMarker = getCurrentPlayerMarker(currentPlayer);
    console.log(board);
  }
  currentPlayer = switchPlayerTurn(gameData);
  if (isBoardFull(board)) {
    console.log("it's a draw!");
    return;
  }
  declareWinner(board, currentPlayer);
  console.log("game over");
}
