'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _intentTypes = require('./intent-types');

var _intentTypes2 = _interopRequireDefault(_intentTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var present = function present(dataset, model) {
  return function (dispatch) {
    if (dataset.type === _intentTypes2.default.SET_GAME_TYPE && model.gameType) {
      return;
    }

    if (dataset.type === _intentTypes2.default.INITIATE_MARK_GRID && (model.gameType !== 'Local Game' && model.player !== model.turn || model.grid.cells[dataset.payload.move] !== '') && !model.grid.finished) {
      return;
    }

    dispatch(dataset);
  };
};

exports.default = present;