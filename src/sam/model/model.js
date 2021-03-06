import { createStore } from 'redux';
import  reducers  from './reducers.js';
import present from './present.js';
import nap from '../nap.js';

const createModel = (firebaseUrl, enhancer) => {
  const store = createStore(reducers, undefined, enhancer);
  nap.init(firebaseUrl);
  const mergeStateToPresent = dataset => {
    present(dataset, store.getState())(store.dispatch);
    nap.evaluate(store.getState())(mergeStateToPresent);
  };

  mergeStateToPresent({type:'FIRST_DISPATCH'});

  return {
    present: mergeStateToPresent,
    store
  };
};

export default createModel
