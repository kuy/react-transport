import { combineReducers } from 'redux';
import {
  CHANGE_VIEW, ADD_USER, REMOVE_USER,
  REGISTER_PANEL, UNREGISTER_PANEL,
  REQUEST_FETCH_USER_PRESENCE, SUCCESS_FETCH_USER_PRESENCE, FAILURE_FETCH_USER_PRESENCE
} from './actions';
import { seqId } from './utils';

const initial = {
  user: {
    presence: null,
    status: '',
    error: false
  }
};

const handlers = {
  app: {},
  view: {
    [CHANGE_VIEW]: (state, action) => {
      return { ...action.payload };
    }
  },
  users: {
    [ADD_USER]: (state, action) => {
      const { name, email } = action.payload;
      return { ...state, [email]: { ...initial.user, name } };
    },
    [REMOVE_USER]: (state, action) => {
      const { email } = action.payload;
      const newState = { ...state };
      delete newState[email];
      return newState;
    },
    [REQUEST_FETCH_USER_PRESENCE]: (state, action) => {
      const { email } = action.payload;
      return { ...state, [email]: { ...state[email], status: 'working' } };
    },
    [SUCCESS_FETCH_USER_PRESENCE]: (state, action) => {
      const { email, presence } = action.payload;
      return { ...state, [email]: { ...state[email], presence, status: 'done', error: false } };
    },
    [FAILURE_FETCH_USER_PRESENCE]: (state, action) => {
      const { email } = action.payload;
      return { ...state, [email]: { ...state[email], presence, status: 'done', error: true } };
    },
  },
  panels: {
    [REGISTER_PANEL]: (state, action) => {
      const id = seqId();
      return {
        list: [ ...state.list, id ],
        entities: { ...state.entities, [id]: { ...action.payload } }
      };
    },
    [UNREGISTER_PANEL]: (state, action) => {
      return state;
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
  {
    app: dispatch('app'),
    view: dispatch('view'),
    users: dispatch('users'),
    panels: dispatch('panels'),
  }
);
