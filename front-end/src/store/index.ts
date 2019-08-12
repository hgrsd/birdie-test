import { applyMiddleware, compose, createStore, GenericStoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '@App/store/reducers';
import initSaga from '@App/store/sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => undefined;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (arg: GenericStoreEnhancer) => undefined;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(initSaga);

export default store;