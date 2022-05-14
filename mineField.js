const {writeFileSync, readFileSync} = require('fs');

const readFile = function () {
  return JSON.parse(readFileSync('./minefield.json', 'utf8'));
};

const writeFile = function (fieldData) {
  return writeFileSync('./mineField.json', JSON.stringify(fieldData), 'utf8');
};

const validMoves = function ({pos, row, col}) {
  const moves = [pos - col, pos - 1, pos, pos + 1, pos + col];
  if (pos % col === 0) moves.splice(3, 1);
  if (pos % col === 1) moves.splice(1, 1);
  if (Math.ceil(pos / row) === 1) moves.splice(0, 1);
  return moves;
};

const isBomb = function ({path}, move) {
  return !path.includes(move);
};

const isMoveValid = function (fieldData, move) {
  return validMoves(fieldData).includes(move);
};

const isMoveInvalid = function (fieldData, move) {
  return !isMoveValid(fieldData, move);
};

const updatePos = function (fieldData, move) {
  fieldData.pos = move;
  return fieldData;
};

const setGameOver = function (fieldData) {
  fieldData.gameStatus = 'Game Over !!!';
  return fieldData;
};

const isGameOver = function ({ pos, path }) {
  return pos === path[path.length - 1];
};

const generateTable = function (row, col) {
  const table = [];
  let num = 1;
  for (let rowNum = 0; rowNum < row; rowNum++) {
    const tr = [];
    for (let colNum = 0; colNum < col; colNum++) {
      tr.push(num++);
    }
    table.unshift(tr);
  }
  return table;
};

const padLeft = function (num) {
  return ('' + num).padStart(2, 0);
};

const displayBoard = function (fieldData) {
  const { pos, row, col } = fieldData;
  const table = generateTable(row, col);
  const currentPos = padLeft(pos);
  const rows = table.map(row => row.map(num => padLeft(num)).join(' | '));
  const board = rows.join('\n');
  const symbol = isBomb(fieldData, pos) ? '😵' : '😇';
  console.log('\n' + board.replace(currentPos, symbol) + '\n');
};

const main = function (move) {
  const fieldData = readFile();

  if (isMoveInvalid(fieldData, move)) {
    console.log('\nInvalid move 😡\n');
    return;
  }

  if (isBomb(fieldData, move)) {
    setGameOver(fieldData);
    console.log('\n❌❌ Boom !!! ❌❌');
  }
  updatePos(fieldData, move);
  
  if (isGameOver(fieldData)) {
    setGameOver(fieldData);
    console.log('\n🥳🤩 Congratulations !!! 🤟🥳');
  }

  writeFile(fieldData);
  displayBoard(fieldData);
};

exports.validMoves = validMoves;
exports.isMoveValid = isMoveValid;
exports.isMoveInvalid = isMoveInvalid;
exports.isBomb = isBomb;
exports.setGameOver = setGameOver;
exports.isGameOver = isGameOver;
exports.updatePos = updatePos;
exports.displayBoard = displayBoard;
exports.generateTable = generateTable;
exports.main = main;
