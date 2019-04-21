import { createStore, combineReducers, compose } from 'redux';

import auth from '../authenticatedPage/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

export const appReducer = combineReducers({
    auth
});

const appStore = createStore(appReducer, composeEnhancers());

export default appStore;
