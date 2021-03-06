import intentTypes from './intent-types';

const present = (dataset, model) => {
  return dispatch => {
    if(dataset.type === intentTypes.SET_GAME_TYPE && model.gameType) {
      return;
    }

    if(dataset.type === intentTypes.INITIATE_MARK_GRID &&
      ((model.gameType !== 'Local Game' && model.player !== model.turn)
      || model.grid.cells[dataset.payload.move] !== ''
      || model.gameType === ''
      || model.turn === '')
      && !model.grid.finished
    ) { return;}

    dispatch(dataset);
  }
};

export default present
