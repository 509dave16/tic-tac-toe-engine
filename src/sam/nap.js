import state from './state'
import createActions from './actions/automatic.js';

let controlStateToActions = undefined;

const init = (firebaseConfig) => {
  const napActions = createActions(firebaseConfig);
  controlStateToActions = {
    initialize: napActions.initializeGridAction,
    startLocalGame: napActions.startLocalGameAction,
    hostSession: napActions.hostSessionAction,
    joinAsGuest: napActions.joinSessionAction,
    localTakeTurn: napActions.localMarkGridAction,
    onlineTakeTurn: napActions.onlineMarkGridAction,
    localTurnSwitch: napActions.localTurnSwitchAction,
    onlineTurnSwitch: napActions.onlineTurnSwitchAction,
    showJoinSessionForm: napActions.setShowJoinSessionFormAction,
    localQuit: napActions.localQuitAction,
    onlineQuit: napActions.onlineQuitAction,
    localRestart: napActions.localRestartAction,
    onlineRestart: napActions.onlineRestartAction,
    finished: napActions.finishedAction
  };
};

const evaluate = (model) => {
  if(controlStateToActions === undefined) {
    throw 'Please call init before evaluate!';
  }
  return present => {
    for (const controlState in controlStateToActions) {
      if(state[controlState](model)) {
        const action = controlStateToActions[controlState];
        action(model, present);
        break;
      }
    }
  }
};

export default {
  init,
  evaluate
}