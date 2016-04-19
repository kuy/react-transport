import { createStore } from 'redux';
import reducer from './reducers';
import DevTools from './dev-tools';

export default function configureStore(initialState) {
  return createStore(
    reducer, initialState, DevTools.instrument()
  );
}
