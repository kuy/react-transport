export const initial = {};

const handlers = {};

export default function appReducer(state = initial, action) {
  const handler = handlers[action.type];
  if (!handler) { return state; }
  return handler(state, action);
};
