'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _automatic = require('./actions/automatic.js');

var _automatic2 = _interopRequireDefault(_automatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlStateToActions = undefined;

var init = function init(firebaseConfig) {
  var napActions = (0, _automatic2.default)(firebaseConfig);
  controlStateToActions = {
    initialize: napActions.initializeGridAction,
    startLocalGame: napActions.startLocalGameAction,
    hostSession: napActions.hostSessionAction,
    joinAsGuest: napActions.joinSessionAction,
    localTakeTurn: napActions.localMarkGridAction,
    onlineTakeTurn: napActions.onlineMarkGridAction,
    localTurnSwitch: napActions.localTurnSwitchAction,
    onlineTurnSwitch: napActions.onlineTurnSwitchAction,
    showJoinSessionForm: napActions.setShowJoinSessionFormAction,
    localQuit: napActions.localQuitAction,
    onlineQuit: napActions.onlineQuitAction,
    localRestart: napActions.localRestartAction,
    onlineRestart: napActions.onlineRestartAction,
    finished: napActions.finishedAction
  };
};

var evaluate = function evaluate(model) {
  if (controlStateToActions === undefined) {
    throw 'Please call init before evaluate!';
  }
  return function (present) {
    for (var controlState in controlStateToActions) {
      if (_state2.default[controlState](model)) {
        var action = controlStateToActions[controlState];
        action(model, present);
        break;
      }
    }
  };
};

exports.default = {
  init: init,
  evaluate: evaluate
};