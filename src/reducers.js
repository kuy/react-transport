import { combineReducers } from 'redux';
import {
  INCREMENT
} from './actions';

const initial = {
  app: {
    count: 0
  }
};

const handlers = {
  app: {
    [INCREMENT]: (state, action) => {
      return { ...state, count: state.count + 1 };
    },
  }
};

function app(state = initial.app, action) {
  const handler = handlers.app[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

export default combineReducers(
  { app }
);
