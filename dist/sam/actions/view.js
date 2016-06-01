'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _intents = require('../model/intents.js');

var _intents2 = _interopRequireDefault(_intents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createActions = function createActions(present) {
    return {
        markGridAction: function markGridAction(cellIndex) {
            return present(_intents2.default.initiateMarkGrid(cellIndex));
        },
        setGameTypeAction: function setGameTypeAction(gameType) {
            return present(_intents2.default.setGameType(gameType));
        },
        initiateQuitAction: function initiateQuitAction() {
            return present(_intents2.default.initiateQuit());
        },
        initiateRestartAction: function initiateRestartAction() {
            return present(_intents2.default.initiateRestart());
        },
        submitSessionAction: function submitSessionAction(submittedSession) {
            return present(_intents2.default.submitSession(submittedSession));
        }
    };
};

exports.default = createActions;