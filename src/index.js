// function createBoard() {
//   let board = [
//     [, ,],
//     [, ,],
//     [, ,],
//   ];
//   return board;
// }
let board = [
  [, ,],
  [, ,],
  [, ,],
];

function isPlaceEmpty(board, row, column) {
  if (board[row][column] === "") {
    return true;
  }
  return false;
}

function playerInsertToBoard() {
  let row = parseInt(
    prompt("pick a row where 0 is the first row and 2 is the last row")
  );
  let column = parseInt(
    prompt("pick a column where 0 is the first row and 2 is the last column")
  );
  if (isPlaceEmpty(board, row, column)) {
    return board;
  }
  playerInsertToBoard();
  // need to make sure is empty place
}

function computerInsertToBoard(board) {
  let row = Math.floor(Math.random * 3);
  let column = Math.floor(Math.random * 3);
  if (isPlaceEmpty(board, row, column)) {
    return board[row][column];
  }
  computerInsertToBoard(board);
}

function checkRows(board){
    // for(let column = 0; board.length; column++){
    //     if(board[row][column])

    }
}