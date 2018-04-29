import { combineReducers } from 'redux';
import jobs from './state/jobs';

// Default states that can be used within reducers
export const loadingState = {
  loading: true,
  loaded: false,
};

export const loadedState = {
  loading: false,
  loaded: false,
};

export const errorState = {
  loading: false,
  loaded: false,
};

// Helper function allowing us to quickly build action creators
export function makeActionCreator(type, ...argNames) {
  return function actionFn(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

// Helper function allowing us to quickly build reducers
export function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action);
    }
    return state;
  };
}

export default combineReducers({
  jobs,
});
