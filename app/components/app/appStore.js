import { createStore, combineReducers } from 'redux';

import auth from '../authenticatedPage/authReducer';

export const appReducer = combineReducers({
    auth
});

const appStore = createStore(appReducer);

export default appStore;
