'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _model = require('./sam/model/model.js');

var _model2 = _interopRequireDefault(_model);

var _view = require('./sam/actions/view.js');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEngine = function createEngine(firebaseUrl, reduxEnhancer) {
    var model = (0, _model2.default)(firebaseUrl, reduxEnhancer);
    var actions = (0, _view2.default)(model.present);
    return {
        store: model.store,
        actions: actions
    };
};

exports.default = createEngine;