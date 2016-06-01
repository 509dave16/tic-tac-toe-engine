'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducerFactory = require('./reducer-factory');

var _intents = require('./intents.js');

var _intents2 = _interopRequireDefault(_intents);

var _reducerDefaults = require('./reducer-defaults.js');

var _reducerDefaults2 = _interopRequireDefault(_reducerDefaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setup = function setup() {
  var reducerConfigs = {};

  var _loop = function _loop(key) {
    var _intents$key = _intents2.default[key]();

    var type = _intents$key.type;
    var payload = _intents$key.payload;

    Object.keys(payload).map(function (reducerKey) {
      if (!_reducerDefaults2.default.hasOwnProperty(reducerKey)) {
        throw reducerKey + ' does not exist on the model! Please fix the intent of type: ' + type + '!';
      }
      reducerConfigs[reducerKey] = reducerConfigs[reducerKey] ? reducerConfigs[reducerKey] : { intentTypes: [], defaultValue: _reducerDefaults2.default[reducerKey] };
      reducerConfigs[reducerKey].intentTypes.push(type);
    });
  };

  for (var key in _intents2.default) {
    _loop(key);
  }

  return (0, _redux.combineReducers)((0, _reducerFactory.createAssignmentReducers)(reducerConfigs));
};

exports.default = setup();