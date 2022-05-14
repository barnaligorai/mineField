const { createReport } = require('./../../concept/createReport.js');

const mineFieldLib = require('./mineField.js');
const validMoves = mineFieldLib.validMoves;
const isMoveValid = mineFieldLib.isMoveValid;
const isMoveInvalid = mineFieldLib.isMoveInvalid;
const isBomb = mineFieldLib.isBomb;
const setGameOver = mineFieldLib.setGameOver;
const updatePos = mineFieldLib.updatePos;
const isGameOver = mineFieldLib.isGameOver;
const main = mineFieldLib.main;

const test = () => {
  const testCases = [
    [
      validMoves({ 'row': 3, 'col': 3, 'pos': 1 }),
      [1, 2, 4],
      'Valid moves from 1.'
    ],
    [
      validMoves({'row': 3, 'col': 3, 'pos': 2 }),
      [1, 2, 3, 5],
      'Valid moves from 2.'
    ],
    [
      validMoves({'row': 3,'col': 3, 'pos': 3}),
      [2, 3, 6],
      'Valid moves from 3.'
    ],
    [
      validMoves({'row': 3,'col': 3, 'pos': 4}),
      [1, 4, 5, 7],
      'Valid moves from 4.'
    ],
    [
      validMoves({'row': 3,'col': 3, 'pos': 5}),
      [2, 4, 5, 6, 8],
      'Valid moves from 5.'
    ],
    [
      validMoves({'row': 3,'col': 3, 'pos': 6}),
      [3, 5, 6, 9],
      'Valid moves from 6.'
    ],
    [
      validMoves({'row': 3,'col': 3, 'pos': 7}),
      [4, 7, 8, 10],
      'Valid moves from 7.'
    ],
    [
      validMoves({'row': 3,'col': 3, 'pos': 8}),
      [5, 7, 8, 9, 11],
      'Valid moves from 8.'
    ],
    [
      validMoves({'row': 3,'col': 3, 'pos': 9}),
      [6, 8, 9, 12],
      'Valid moves from 9.'
    ],
    [
      isMoveValid({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}, 8),
      true,
      'Valid move of a middle number.'
    ],
    [
      isMoveValid({'path': [1,4,5,8,11], 'row': 3,'col': 3, 'pos': 4}, 5),
      true,
      'Valid move of a side number.'
    ],
    [
      isMoveValid({'path': [3,6,9,12], 'row': 3,'col': 3, 'pos': 9}, 12),
      true,
      'Valid move of a corner number.'
    ],
    [
      isMoveValid({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}, 1),
      false, 'Valid move of a middle number.'
    ],
    [
      isMoveInvalid({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}, 1),
      true,
      'Invalid move of a middle number.'
    ],
    [
      isMoveInvalid({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}, 6),
      false,
      'Valid move of a middle number.'
    ],
    [
      isBomb({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}, 6),
      true,
      'Stepped on a bomb.'
    ],
    [
      isBomb({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}, 8),
      false,
      'Not stepped on a bomb.'
    ],
    [
      updatePos({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}, 8),
      { 'path': [2, 5, 8, 11], 'row': 3, 'col': 3, 'pos': 8 },
      'Updating position.'
    ],
    [
      setGameOver({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 5}),
      { 'path': [2, 5, 8, 11], 'row': 3, 'col': 3, 'pos': 5, 'gameStatus': 'Game Over !!!' },
      'Set game over status.'
    ],
    [
      isGameOver({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 11}),
      true,
      'When game is over.'
    ],
    [
      isGameOver({'path': [2,5,8,11], 'row': 3,'col': 3, 'pos': 8}),
      false,
      'When game is not over.'
  ],
  ];
  
  createReport(testCases);
};

test();
