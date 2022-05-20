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

function isAvailable(board, selectedPosition) {
  return board[selectedPosition] === -1;
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
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== -1) {
      count++;
    }
  }
  if (count === 9) return true;
  return false;

  // return
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

function winnerDeclaration(board, currentPlayer) {
  if (currentPlayer) {
    return console.log("player 1 is the winner!");
  } else {
    return console.log("player 2 is the winner!");
  }
}
function main() {
  const board = initiateBoard();
  const gameData = {
    playerTurn: true,
  };
  let currentPlayer = gameData.playerTurn; // DOM
  let currentMarker = getCurrentPlayerMarker(currentPlayer);
  let selectedPosition = 42; //DOM

  do {
    while (!isAvailable(board, selectedPosition)) {
      if (selectedPosition !== 42) {
        console.log(selectedPosition);
        console.log("This location already been taken. Try another one!");
      }
      selectedPosition = getUserLocation(); //DOM
      if (selectedPosition === "q") {
        console.log("Game is over bitch");
        return;
      }
    }
    updateBoardAccordingToPlayerChoice(board, currentPlayer, selectedPosition);
    currentPlayer = switchPlayerTurn(gameData);
    currentMarker = getCurrentPlayerMarker(currentPlayer);
    console.log(board);
  } while (!isGameOver(board));
  currentPlayer = switchPlayerTurn(gameData);
  if (isBoardFull(board)) {
    console.log("it's a draw!");
    return;
  }
  winnerDeclaration(board, currentPlayer);
  console.log("game over");
}
