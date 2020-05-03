import { createStore, compose, applyMiddleware } from "redux";
import { createOffline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const sagaMiddleware = createSagaMiddleware();
const {
  middleware: offlineMiddleware,
  enhanceReducer,
  enhanceStore,
} = createOffline({
  ...offlineConfig,
  persistOptions: {
    blacklist: [],
  },
});
const middleware = applyMiddleware(sagaMiddleware, offlineMiddleware);

const configureStore = () => {
  const store = createStore(
    enhanceReducer(reducers),
    composeEnhancers(enhanceStore, middleware)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
