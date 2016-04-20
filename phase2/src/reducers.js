import { combineReducers } from 'redux';
import {
  REQUEST_FETCH_USER_PRESENCE, SUCCESS_FETCH_USER_PRESENCE, FAILURE_FETCH_USER_PRESENCE
} from './actions';

const initial = {
  presence: null,
  status: 'working',
  error: false
};

const handlers = {
  app: {},
  users: {
    [REQUEST_FETCH_USER_PRESENCE]: (state, action) => {
      const { email } = action.payload;
      return { ...state.users, [email]: { ...initial } };
    },
    [SUCCESS_FETCH_USER_PRESENCE]: (state, action) => {
      const { email, presence } = action.payload;
      return { ...state.users, [email]: { presence, status: 'done', error: false } };
    },
    [FAILURE_FETCH_USER_PRESENCE]: (state, action) => {
      const { email } = action.payload;
      return { ...state.users, [email]: { presence, status: 'done', error: true } };
    },
  }
};

function dispatch(name) {
  return (state = {}, action) => {
    const handler = handlers[name][action.type];
    if (!handler) { return state; }
    return handler(state, action);
  };
}

export default combineReducers(
  { app: dispatch('app'), users: dispatch('users') }
);
