import createModel from './sam/model/model.js';
import createActions from './sam/actions/view.js';

const createEngine = (firebaseUrl, reduxEnhancer) => {
    const model = createModel(firebaseUrl,reduxEnhancer);
    const actions = createActions(model.present);
    return {
      store: model.store,
      actions
    };
};

export default createEngine;
