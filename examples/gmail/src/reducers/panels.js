import { REGISTER_PANEL, UNREGISTER_PANEL, } from '../actions';
import { seqId } from '../utils';

export const initial = {
  list: [],
  entities: {},
};

const handlers = {
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
};

export default function panelsReducer(state = initial, action) {
  const handler = handlers[action.type];
  if (!handler) { return state; }
  return handler(state, action);
};
