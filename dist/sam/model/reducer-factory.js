'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAssignmentReducers = undefined;

var _reduxActions = require('redux-actions');

var assignmentReducer = function assignmentReducer(reducerKey, defaultValue, intentTypes) {
  var intentHandlers = {};
  intentTypes.map(function (intentType) {
    return intentHandlers[intentType] = function (state, intent) {
      return intent.payload[reducerKey] !== undefined ? intent.payload[reducerKey] : state;
    };
  });

  return (0, _reduxActions.handleActions)(intentHandlers, defaultValue);
};

var createAssignmentReducers = function createAssignmentReducers(reducerConfigs) {
  var reducers = {};
  for (var reducerKey in reducerConfigs) {
    var _reducerConfigs$reduc = reducerConfigs[reducerKey];
    var defaultValue = _reducerConfigs$reduc.defaultValue;
    var intentTypes = _reducerConfigs$reduc.intentTypes;

    reducers[reducerKey] = assignmentReducer(reducerKey, defaultValue, intentTypes);
  }
  return reducers;
};

exports.createAssignmentReducers = createAssignmentReducers;