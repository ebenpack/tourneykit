import { createStore, combineReducers, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "../auth/authReducer";

export const appReducer = combineReducers({
    auth,
});

const appStore = createStore(appReducer, composeWithDevTools());

export type RootState = ReturnType<typeof appReducer>;

export default appStore;
