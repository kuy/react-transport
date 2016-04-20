import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import DevTools from './dev-tools';
import saga from './sagas';

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        createSagaMiddleware(saga)
      ),
      DevTools.instrument()
    )
  );
}
