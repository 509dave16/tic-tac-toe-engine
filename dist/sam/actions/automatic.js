'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _intents = require('../model/intents');

var _intents2 = _interopRequireDefault(_intents);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _squareGrid = require('./helpers/square-grid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var switchTurn = function switchTurn(turn) {
  return turn !== '' ? turn === 'X' ? 'O' : 'X' : Math.random() > 0.5 ? 'X' : 'O';
};
var createActions = function createActions(firebaseUrl) {
  var firebase = new _firebase2.default(firebaseUrl);
  var firebaseSession = undefined;

  var initializeGridAction = function initializeGridAction(model, present) {
    var grid = (0, _squareGrid.generateSquareGrid)(model.grid.size);
    var finishedGrid = Object.assign({}, model.grid, grid, { initialized: true });
    present(_intents2.default.initializeGrid(finishedGrid));
  };

  var localMarkGridAction = function localMarkGridAction(model, present) {
    var move = model.move;
    var turn = model.turn;
    var grid = model.grid;

    var updatedGrid = (0, _squareGrid.markGrid)(grid, move, turn);
    present(_intents2.default.markGrid(updatedGrid));
  };

  var onlineMarkGridAction = function onlineMarkGridAction(model, present) {
    var cellIndex = model.move;
    var mark = model.turn;
    var grid = model.grid;
    firebaseSession.child('move').set({ cellIndex: cellIndex, mark: mark, grid: grid });
  };

  var hostSessionAction = function hostSessionAction(model, present) {
    firebase.child('sessions').push({ status: 'Yayy!' }).then(function (firebaseRef) {
      firebaseSession = firebaseRef;
      var session = firebaseSession.key();
      setupFirebaseHandlers(session, present);
      present(_intents2.default.hostSession(session));
    });
  };

  var setShowJoinSessionFormAction = function setShowJoinSessionFormAction(model, present) {
    present(_intents2.default.showJoinSessionForm());
  };

  var joinSessionAction = function joinSessionAction(model, present) {
    var session = model.submittedSession;
    firebase.child('sessions').child(session).once('value', function (snapshot) {
      if (snapshot.exists()) {
        firebaseSession = firebase.child('sessions').child(session);
        setupFirebaseHandlers(session, present);
        present(_intents2.default.joinSession(session));
      } else {
        present(_intents2.default.wrongSession());
      }
    });
  };

  var localTurnSwitchAction = function localTurnSwitchAction(model, present) {
    var turn = switchTurn(model.turn);
    present(_intents2.default.turnSwitch(turn, turn + '\'s turn'));
  };

  var onlineTurnSwitchAction = function onlineTurnSwitchAction(model, present) {
    var turn = switchTurn(model.turn);
    firebaseSession.child('turn').set(turn);
  };

  var localQuitAction = function localQuitAction(model, present) {
    present(_intents2.default.quit());
  };

  var onlineQuitAction = function onlineQuitAction(model, present) {
    firebaseSession.child('status').set('Quit', function (error) {
      firebase.child('sessions').child(model.session).remove();
    });
  };

  var localRestartAction = function localRestartAction(model, present) {
    present(_intents2.default.restart());
  };

  var onlineRestartAction = function onlineRestartAction(model, present) {
    firebaseSession.update({ status: 'Restart', turn: null }, function (error) {
      firebaseSession.update({ status: 'Restarted' }, function (error) {});
    });
  };

  var finishedAction = function finishedAction(model, present) {
    var gameStatus = model.grid.winner ? model.turn + ' won!' : 'It\'s a Draw!';
    present(_intents2.default.finished(gameStatus));
  };

  var startLocalGameAction = function startLocalGameAction(model, present) {
    present(_intents2.default.startLocalGame());
  };

  var setupFirebaseHandlers = function setupFirebaseHandlers(session, present) {
    firebaseSession.child('move').on('value', function (snapshot) {
      var move = snapshot.val();
      if (move) {
        var cellIndex = move.cellIndex;
        var mark = move.mark;
        var grid = move.grid;

        var updatedGrid = (0, _squareGrid.markGrid)(grid, cellIndex, mark);
        present(_intents2.default.markGrid(updatedGrid));
      }
    });

    firebaseSession.child('turn').on('value', function (snapshot) {
      var turn = snapshot.val();
      if (turn) {
        present(_intents2.default.turnSwitch(turn, turn + '\'s turn'));
      }
    });

    firebaseSession.child('status').on('value', function (snapshot) {
      var status = snapshot.val();
      if (status) {
        switch (status) {
          case 'Quit':
            present(_intents2.default.quit());
            break;
          case 'Restart':
            present(_intents2.default.restart());
            break;
        }
      }
    });

    firebase.child('sessions').on('child_removed', function (snapshot) {
      if (snapshot.key() === session) {
        present(_intents2.default.quit());
      }
    });

    if (window !== undefined) {
      window.onbeforeunload = function (e) {
        firebase.child('sessions').child(session).remove();
      };
    }
  };

  return {
    initializeGridAction: initializeGridAction,
    localMarkGridAction: localMarkGridAction,
    onlineMarkGridAction: onlineMarkGridAction,
    hostSessionAction: hostSessionAction,
    joinSessionAction: joinSessionAction,
    setShowJoinSessionFormAction: setShowJoinSessionFormAction,
    localTurnSwitchAction: localTurnSwitchAction,
    onlineTurnSwitchAction: onlineTurnSwitchAction,
    localQuitAction: localQuitAction,
    onlineQuitAction: onlineQuitAction,
    localRestartAction: localRestartAction,
    onlineRestartAction: onlineRestartAction,
    finishedAction: finishedAction,
    startLocalGameAction: startLocalGameAction
  };
};

exports.default = createActions;