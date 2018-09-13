import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middlewares = [];
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger({
      collapsed: (getState, action, logEntry) => !logEntry.error,
    });
    middlewares.push(loggerMiddleware);
  }
  middlewares.push(sagaMiddleware);

  enhancers.push(applyMiddleware(...middlewares));

  const store = createStore(reducers, compose(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
}
