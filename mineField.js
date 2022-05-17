const fs = require('fs');

const readFile = function () {
  return JSON.parse(fs.readFileSync('./minefield.json', 'utf8'));
};

const print = message => console.log(message);

const writeFile = function (fieldData) {
  return fs.writeFileSync('./mineField.json', JSON.stringify(fieldData), 'utf8');
};

const validMoves = function ({pos, row, col}) {
  const moves = [pos - col, pos - 1, pos, pos + 1, pos + col];
  if (pos % col === 0) moves.splice(3, 1);
  if (pos % col === 1) moves.splice(1, 1);
  if (Math.ceil(pos / row) === 1) moves.splice(0, 1);
  return moves;
};

const isBomb = ({path}, move) => !path.includes(move);

const isMoveValid = (fieldData, move) => validMoves(fieldData).includes(move);

const isMoveInvalid = (fieldData, move) => !isMoveValid(fieldData, move);

const updatePos = function (fieldData, move) {
  fieldData.pos = move;
  return fieldData;
};

const setGameOver = function (fieldData) {
  fieldData.gameStatus = 'Game Over.';
  return fieldData;
};

const isGameOver = (fieldData) => {
  const { pos, path } = fieldData;
  if (isBomb({path}, pos)) {
    fieldData.message = '\n❌❌ Boom !!! ❌❌';
    return true;
  } else if (pos === Math.max(...path)) {
    fieldData.message = '\n🥳🤩 Congratulations !!! 🤟🥳';
    return true;
  }
  return false;
};

const partitionBy = function (group, element) {
    const lastGroup = group[group.length - 1];
    if (lastGroup.length < this) {
      lastGroup.push(element);
      return group;
    }
    group.push([element]);
    return group;
};

const seq = limit => Array(limit).fill(1).map((element, index) => index + 1);

const createTable = (row, col) => seq(row * col).reduce(partitionBy.bind(col), [[]]);

const padLeft = num => ('' + num).padStart(2, 0);

const displayBoard = function (fieldData) {
  const { pos, row, col } = fieldData;
  const table = createTable(row, col).reverse();
  const currentPos = padLeft(pos);
  const rows = table.map(row => row.map(num => padLeft(num)).join(' | '));
  const board = rows.join('\n');
  const symbol = isBomb(fieldData, pos) ? '😵' : '😇';
  print('\n' + board.replace(currentPos, symbol) + '\n');
};

const mapMove = ({pos, col}, char) => {
  const moves = {
    'u' : pos + col,
    'd' : pos - col,
    'l' : pos - 1,
    'r' : pos + 1,
  };
  return moves[char.toLowerCase()];
};

const main = function (playersChoice) {
  let fieldData;
  try {
    fieldData = readFile();
  } catch (error) {
    print('Can\'t read the source file.');
    writeFile({ gameStatus: 'Game Over.' });
    return;
  }

  const move = mapMove(fieldData, playersChoice);
  if (isMoveInvalid(fieldData, move)) {
    print('\nInvalid move 😡\n');
    return ;
  }

  updatePos(fieldData, move);
  if (isGameOver(fieldData)) {
    setGameOver(fieldData);
    print(fieldData.message);
  }
  
  try {
    writeFile(fieldData);
  } catch (error) {
    print('\nCan\'t write the source file.');
  }
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
exports.createTable = createTable;
exports.mapMove = mapMove;
exports.seq = seq;
exports.main = main;
