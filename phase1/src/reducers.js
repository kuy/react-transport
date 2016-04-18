import { combineReducers } from 'redux';
import {
  INCREMENT, ADD
} from './actions';

const initial = {
  app: {
    count: 0,
    notification: []
  }
};

const handlers = {
  app: {
    [INCREMENT]: (state, action) => {
      return { ...state, count: state.count + 1 };
    },
    [ADD]: (state, action) => {
      return { ...state, notification: [`Notification #${state.notification.length + 1}`, ...state.notification] };
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
