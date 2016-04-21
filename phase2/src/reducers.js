import { combineReducers } from 'redux';
import {
  REGISTER_LABEL, UNREGISTER_LABEL,
  ADD_USER, REMOVE_USER,
  REQUEST_FETCH_USER_PRESENCE, SUCCESS_FETCH_USER_PRESENCE, FAILURE_FETCH_USER_PRESENCE
} from './actions';

const initial = {
  user: {
    presence: null,
    status: '',
    error: false
  },
  label: {
    group: null,
    el: null,
    threadId: null,
  }
};

const handlers = {
  app: {},
  users: {
    [ADD_USER]: (state, action) => {
      const { email } = action.payload;
      return { ...state, [email]: { ...initial.user } };
    },
    [REMOVE_USER]: (state, action) => {
      const { email } = action.payload;
      const newState = { ...state };
      delete newState[email];
      return newState;
    },
    [REQUEST_FETCH_USER_PRESENCE]: (state, action) => {
      const { email } = action.payload;
      return { ...state, [email]: { ...initial.user, status: 'working' } };
    },
    [SUCCESS_FETCH_USER_PRESENCE]: (state, action) => {
      const { email, presence } = action.payload;
      return { ...state, [email]: { presence, status: 'done' } };
    },
    [FAILURE_FETCH_USER_PRESENCE]: (state, action) => {
      const { email } = action.payload;
      return { ...state, [email]: { presence, status: 'done', error: true } };
    },
  },
  labels: {
    [REGISTER_LABEL]: (state, action) => {
      
    },
    [UNREGISTER_LABEL]: (state, action) => {
      
    }
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
