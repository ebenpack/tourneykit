import { RootState } from "../app/appStore";

export const isLoggedIn = (state: RootState) => state.auth.loggedIn;
