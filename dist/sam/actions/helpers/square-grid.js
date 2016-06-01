'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function generateSquareGrid(size) {
  var cells = [];
  var numOfCells = Math.pow(size, 2);
  for (var count = 0; count < numOfCells; count++) {
    cells.push('');
  }

  var properties = generateSets(size);
  properties.cells = cells;
  return properties;
}

function markGrid(grid, cellIndex, mark) {

  var movesTaken = grid.movesTaken + 1;
  var cellSets = grid.cellSets;
  var initialized = grid.initialized;
  var size = grid.size;


  var cells = grid.cells.map(function (value, index) {
    if (index === cellIndex) {
      return mark;
    }
    return value;
  });

  var setIndexes = cellSets[cellIndex];
  var sets = grid.sets.map(function (set, index) {
    if (setIndexes.indexOf(index) !== -1 && (set.mark === '' || set.mark === mark)) {
      return { mark: mark, count: set.count + 1 };
    }
    return set;
  });

  var winner = checkSets(sets, size);
  var finished = winner;
  finished = movesTaken === Math.pow(size, 2) && !winner ? true : finished;

  return { cells: cells, sets: sets, cellSets: cellSets, movesTaken: movesTaken, finished: finished, initialized: initialized, size: size, winner: winner };
}

function generateSets(size) {
  var sets = [];
  var cellSets = [];
  generateVerticalSets(size, sets, cellSets);
  generateHorizontalSets(size, sets, cellSets);
  generateTopLeftToBottomRightDiagonalSet(size, sets, cellSets);
  generateTopRightToBottomLeftDiagonalSet(size, sets, cellSets);

  return { sets: sets, cellSets: cellSets };
}

function checkSets(sets, size) {
  for (var index = 0; index < sets.length; index++) {
    var cellSet = sets[index];
    if (cellSet.count === size) {
      return true;
    }
  }
  return false;
}

function generateVerticalSets(size, sets, cellSets) {
  for (var col = 0; col < size; col++) {
    var setIndex = addDefaultSet(sets);
    for (var row = 0; row < size; row++) {
      var cellIndex = size * row + col;
      if (cellSets[cellIndex] === undefined) {
        cellSets[cellIndex] = [];
      }
      cellSets[cellIndex].push(setIndex);
    }
  }
}

function generateHorizontalSets(size, sets, cellSets) {
  for (var row = 0; row < size; row++) {
    var setIndex = addDefaultSet(sets);
    for (var col = 0; col < size; col++) {
      var cellIndex = size * row + col;
      if (cellSets[cellIndex] === undefined) {
        cellSets[cellIndex] = [];
      }
      cellSets[cellIndex].push(setIndex);
    }
  }
}

function generateTopRightToBottomLeftDiagonalSet(size, sets, cellSets) {
  var setIndex = addDefaultSet(sets);
  var constant = size - 1;
  for (var count = 0; count < size; count++) {
    var cellIndex = constant * count + constant;
    if (cellSets[cellIndex] === undefined) {
      cellSets[cellIndex] = [];
    }
    cellSets[cellIndex].push(setIndex);
  }
}

function generateTopLeftToBottomRightDiagonalSet(size, sets, cellSets) {
  var setIndex = addDefaultSet(sets);
  for (var count = 0; count < size; count++) {
    var cellIndex = size * count + count;
    if (cellSets[cellIndex] === undefined) {
      cellSets[cellIndex] = [];
    }
    cellSets[cellIndex].push(setIndex);
  }
}

function addDefaultSet(sets) {
  return sets.push({ mark: '', count: 0 }) - 1;
}

exports.generateSquareGrid = generateSquareGrid;
exports.markGrid = markGrid;
exports.checkSets = checkSets;