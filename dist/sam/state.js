'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var state = {};
state.initialize = function (model) {
  return !model.grid.initialized;
};
state.startLocalGame = function (model) {
  return model.gameType === 'Local Game' && model.turn === '' && !model.turnSwitch;
};
state.hostSession = function (model) {
  return model.gameType === 'Host Game' && !model.session;
};
state.showJoinSessionForm = function (model) {
  return model.gameType === 'Join Game' && !model.showJoinSessionForm && !model.session;
};
state.joinAsGuest = function (model) {
  return model.gameType === 'Join Game' && model.submittedSession;
};
state.localTakeTurn = function (model) {
  return model.gameType === 'Local Game' && model.move !== -1 && model.turn && !model.grid.finished;
};
state.onlineTakeTurn = function (model) {
  return model.gameType !== 'Local Game' && model.move !== -1 && model.turn && !model.grid.finished;
};
state.localTurnSwitch = function (model) {
  return model.gameType === 'Local Game' && model.turnSwitch && !model.grid.finished;
};
state.onlineTurnSwitch = function (model) {
  return model.gameType !== 'Local Game' && model.turnSwitch && !model.grid.finished;
};
state.localQuit = function (model) {
  return model.gameType === 'Local Game' && model.quit;
};
state.onlineQuit = function (model) {
  return model.gameType !== 'Local Game' && model.quit;
};
state.localRestart = function (model) {
  return model.gameType === 'Local Game' && model.restart;
};
state.onlineRestart = function (model) {
  return model.gameType !== 'Local Game' && model.restart;
};
state.inGame = function (model) {
  return model.turn && !model.grid.finished;
};
state.finished = function (model) {
  return model.grid.finished && !model.done;
};
state.done = function (model) {
  return model.done;
};
exports.default = state;