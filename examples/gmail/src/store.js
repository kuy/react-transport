import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import DevTools from './dev-tools';
import saga from './sagas';
import logger from 'redux-logger';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        logger()
      ),
      DevTools.instrument()
    )
  );
  sagaMiddleware.run(saga);
  return store;
}
