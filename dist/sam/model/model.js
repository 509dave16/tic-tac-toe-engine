'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducers = require('./reducers.js');

var _reducers2 = _interopRequireDefault(_reducers);

var _present = require('./present.js');

var _present2 = _interopRequireDefault(_present);

var _nap = require('../nap.js');

var _nap2 = _interopRequireDefault(_nap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createModel = function createModel(firebaseConfig, enhancer) {
  var store = (0, _redux.createStore)(_reducers2.default, undefined, enhancer);
  _nap2.default.init(firebaseConfig);
  var mergeStateToPresent = function mergeStateToPresent(dataset) {
    (0, _present2.default)(dataset, store.getState())(store.dispatch);
    _nap2.default.evaluate(store.getState())(mergeStateToPresent);
  };

  mergeStateToPresent({ type: 'FIRST_DISPATCH' });

  return {
    present: mergeStateToPresent,
    store: store
  };
};

exports.default = createModel;