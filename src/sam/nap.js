import state from './state'
import createActions from './actions/automatic.js';

let controlStateToActions = undefined;

const init = (firebaseUrl) => {
  const napActions = createActions(firebaseUrl);
  controlStateToActions = [
    { predicate: state.initialize, action: napActions.initializeGridAction},
    { predicate: state.startLocalGame, action: napActions.startLocalGameAction},
    { predicate: state.hostSession, action: napActions.hostSessionAction},
    { predicate: state.joinAsGuest, action: napActions.joinSessionAction},
    { predicate: state.localTakeTurn, action: napActions.localMarkGridAction},
    { predicate: state.onlineTakeTurn, action: napActions.onlineMarkGridAction},
    { predicate: state.localTurnSwitch, action: napActions.localTurnSwitchAction},
    { predicate: state.onlineTurnSwitch, action: napActions.onlineTurnSwitchAction},
    { predicate: state.showJoinSessionForm, action: napActions.setShowJoinSessionFormAction},
    { predicate: state.localQuit, action: napActions.localQuitAction},
    { predicate: state.onlineQuit, action: napActions.onlineQuitAction},
    { predicate: state.localRestart, action: napActions.localRestartAction},
    { predicate: state.onlineRestart, action: napActions.onlineRestartAction},
    { predicate: state.finished, action: napActions.finishedAction}
  ];
};

const evaluate = (model) => {
  if (controlStateToActions === undefined) {
    throw 'Please call init before evaluate!';
  }
  return present => {

    let actionToCall = undefined;
    for (let index = 0; index < controlStateToActions.length; index++) {
      const { predicate, action } = controlStateToActions[index];
      if (predicate(model)) {
        actionToCall = action;
        break;
      }
    }
    if (actionToCall) actionToCall(model, present);
  }
};

export default {
  init,
  evaluate
}