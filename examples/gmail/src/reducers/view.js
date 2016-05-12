import { CHANGE_VIEW } from '../actions';

export const initial = {};

const handlers = {
  [CHANGE_VIEW]: (state, action) => {
    return { ...action.payload };
  }
};

export default function viewReducer(state = initial, action) {
  const handler = handlers[action.type];
  if (!handler) { return state; }
  return handler(state, action);
};
