'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = require('redux-actions');

var _intentTypes = require('./intent-types.js');

var _intentTypes2 = _interopRequireDefault(_intentTypes);

var _reducerDefaults = require('./reducer-defaults.js');

var _reducerDefaults2 = _interopRequireDefault(_reducerDefaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grid = _reducerDefaults2.default.grid;
var gameType = _reducerDefaults2.default.gameType;
var gameStatus = _reducerDefaults2.default.gameStatus;
var player = _reducerDefaults2.default.player;
var session = _reducerDefaults2.default.session;
var showJoinSessionForm = _reducerDefaults2.default.showJoinSessionForm;
var submittedSession = _reducerDefaults2.default.submittedSession;
var move = _reducerDefaults2.default.move;
var turn = _reducerDefaults2.default.turn;
var turnSwitch = _reducerDefaults2.default.turnSwitch;
var quit = _reducerDefaults2.default.quit;
var restart = _reducerDefaults2.default.restart;
var done = _reducerDefaults2.default.done;
exports.default = {
  initializeGrid: (0, _reduxActions.createAction)(_intentTypes2.default.INITIALIZE_GRID, function (grid) {
    return { grid: grid };
  }),
  initiateMarkGrid: (0, _reduxActions.createAction)(_intentTypes2.default.INITIATE_MARK_GRID, function (move) {
    return { move: move };
  }),
  markGrid: (0, _reduxActions.createAction)(_intentTypes2.default.MARK_GRID, function (grid) {
    return { grid: grid, move: move, turnSwitch: true };
  }),
  setGameType: (0, _reduxActions.createAction)(_intentTypes2.default.SET_GAME_TYPE, function (gameType) {
    return { gameType: gameType };
  }),
  startLocalGame: (0, _reduxActions.createAction)(_intentTypes2.default.START_LOCAL_GAME, function () {
    return { turnSwitch: true };
  }),
  hostSession: (0, _reduxActions.createAction)(_intentTypes2.default.HOST_SESSION, function (session) {
    return { player: 'X', gameStatus: 'Waiting for player to join game!', session: session };
  }),
  showJoinSessionForm: (0, _reduxActions.createAction)(_intentTypes2.default.SHOW_JOIN_SESSION_FORM, function () {
    return { showJoinSessionForm: true };
  }),
  joinSession: (0, _reduxActions.createAction)(_intentTypes2.default.JOIN_SESSION, function (session) {
    return { player: 'O', submittedSession: submittedSession, showJoinSessionForm: showJoinSessionForm, turnSwitch: true, session: session };
  }),
  wrongSession: (0, _reduxActions.createAction)(_intentTypes2.default.WRONG_SESSION, function () {
    return { submittedSession: submittedSession };
  }),
  submitSession: (0, _reduxActions.createAction)(_intentTypes2.default.SUBMIT_SESSION, function (submittedSession) {
    return { submittedSession: submittedSession };
  }),
  turnSwitch: (0, _reduxActions.createAction)(_intentTypes2.default.TURN_SWITCH, function (turn, gameStatus) {
    return { turn: turn, gameStatus: gameStatus, turnSwitch: turnSwitch };
  }),
  initiateQuit: (0, _reduxActions.createAction)(_intentTypes2.default.INITIATE_QUIT, function () {
    return { quit: true };
  }),
  initiateRestart: (0, _reduxActions.createAction)(_intentTypes2.default.INITIATE_RESTART, function () {
    return { restart: true };
  }),
  quit: (0, _reduxActions.createAction)(_intentTypes2.default.QUIT, function () {
    return _reducerDefaults2.default;
  }),
  restart: (0, _reduxActions.createAction)(_intentTypes2.default.RESTART, function () {
    return { move: move, turn: turn, restart: restart, done: done, grid: grid };
  }),
  finished: (0, _reduxActions.createAction)(_intentTypes2.default.FINISHED, function (gameStatus) {
    return { gameStatus: gameStatus, done: true };
  })
};