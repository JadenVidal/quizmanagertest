import { combineReducers } from 'redux';

import smartiesReducer from './smarties-reducer';

const appReducer = combineReducers({
  smarties: smartiesReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;