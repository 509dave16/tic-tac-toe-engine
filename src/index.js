import createModel from './sam/model/model.js';
import createActions from './sam/actions/view.js';

const createEngine = (firebaseConfig, reduxEnhancer) => {
    const model = createModel(firebaseConfig,reduxEnhancer);
    const actions = createActions(model.present);
    return {
      store: model.store,
      actions
    };
};

export default createEngine;
