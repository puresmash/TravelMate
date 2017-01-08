
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { getStoredState, persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import * as reducers from '@reducers';
const reducer = combineReducers(reducers);
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

function configureStore(onComplete) {

  const store = createStore(
    reducer, applyMiddleware(thunk), autoRehydrate()
  );
  // const store = autoRehydrate()(createAppStore)(reducers);
  const persistor = persistStore(store, {
    storage: AsyncStorage,
    // transforms: [immutableTransform({
    //   whitelist: ['userReducer', 'travelReducer', 'accountingReducer']
    // })],
  }, onComplete);

  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
