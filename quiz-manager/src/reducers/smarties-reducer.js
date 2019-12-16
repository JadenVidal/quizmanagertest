import produce from 'immer';

const initialState = {
    orange: 4,
    brown: 6,
    purple: 6,
    pink: 5,
    red: 3,
    green: 3,
    yellow: 3,
    blue: 2,
    total:32
};

const smartiesReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case 'REM_SMRT':
        let color = action.payload;
        if (draftState[`${color}`] > 0){
          draftState[`${color}`] = draftState[`${color}`]-1;
          draftState.total = draftState.total-1
        }
        break;
      default:
        break;
    }
  });
};

export default smartiesReducer;
