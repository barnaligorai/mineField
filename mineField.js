const fs = require('fs');

const readFile = function () {
  return JSON.parse(fs.readFileSync('./minefield.json', 'utf8'));
};

const writeFile = function (fieldData) {
  return fs.writeFileSync('./mineField.json', JSON.stringify(fieldData), 'utf8');
};

const validMoves = function ({pos, row, col}) {
  const moves = [pos - col, pos - 1, pos + 1, pos + col];
  if (pos % col === 0) moves.splice(2, 1);
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

const isGameOver = function ({pos, path}) {
 return pos === path[path.length - 1];
}

const main = function () {
  const fieldData = readFile();
  const move = + process.argv[2];

  if (isMoveInvalid(fieldData, move)) {
    console.log('Invalid move ❌');
    return;
  }

  if (isBomb(fieldData, move)) {
    setGameOver(fieldData);
    console.log('Boom !!! 😵🤯');
  } else {
    updatePos(fieldData, move);
  }
  
  if (isGameOver(fieldData)) {
    setGameOver(fieldData);
    console.log('Congratulations !!! 🤟🤘');
  }

  writeFile(fieldData);
  console.log('Your current position : ', fieldData.pos);
};

main();

exports.validMoves = validMoves;
exports.isMoveValid = isMoveValid;
exports.isMoveInvalid = isMoveInvalid;
exports.isBomb = isBomb;
exports.setGameOver = setGameOver;
exports.isGameOver = isGameOver;
exports.updatePos = updatePos;
exports.main = main;
