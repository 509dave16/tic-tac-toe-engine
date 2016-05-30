import { createStore } from 'redux'
import  reducers  from './reducers.js'
import present from './present.js'
import nap from '../nap.js'

const createModel = (firebaseUrl, enhancer) => {
  const store = createStore(reducers, undefined, enhancer);
  const mergeStateToPresent = dataset => {
    present(dataset, store.getState())(store.dispatch);
    nap(store.getState(), firebaseUrl)(mergeStateToPresent);
  };

  mergeStateToPresent({type:'FIRST_DISPATCH'});

  return {
    present: mergeStateToPresent,
    store
  };
};

export default createModel
