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

var init = function init(firebaseUrl) {
  var napActions = (0, _automatic2.default)(firebaseUrl);
  controlStateToActions = [{ predicate: _state2.default.initialize, action: napActions.initializeGridAction }, { predicate: _state2.default.startLocalGame, action: napActions.startLocalGameAction }, { predicate: _state2.default.hostSession, action: napActions.hostSessionAction }, { predicate: _state2.default.joinAsGuest, action: napActions.joinSessionAction }, { predicate: _state2.default.localTakeTurn, action: napActions.localMarkGridAction }, { predicate: _state2.default.onlineTakeTurn, action: napActions.onlineMarkGridAction }, { predicate: _state2.default.localTurnSwitch, action: napActions.localTurnSwitchAction }, { predicate: _state2.default.onlineTurnSwitch, action: napActions.onlineTurnSwitchAction }, { predicate: _state2.default.showJoinSessionForm, action: napActions.setShowJoinSessionFormAction }, { predicate: _state2.default.localQuit, action: napActions.localQuitAction }, { predicate: _state2.default.onlineQuit, action: napActions.onlineQuitAction }, { predicate: _state2.default.localRestart, action: napActions.localRestartAction }, { predicate: _state2.default.onlineRestart, action: napActions.onlineRestartAction }, { predicate: _state2.default.finished, action: napActions.finishedAction }];
};

var evaluate = function evaluate(model) {
  if (controlStateToActions === undefined) {
    throw 'Please call init before evaluate!';
  }
  return function (present) {

    var actionToCall = undefined;
    for (var index = 0; index < controlStateToActions.length; index++) {
      var _controlStateToAction = controlStateToActions[index];
      var predicate = _controlStateToAction.predicate;
      var action = _controlStateToAction.action;

      if (predicate(model)) {
        actionToCall = action;
        break;
      }
    }
    if (actionToCall) actionToCall(model, present);
  };
};

exports.default = {
  init: init,
  evaluate: evaluate
};