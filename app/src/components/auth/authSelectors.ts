import { RootState } from "../app/appStore";

export const isLoggedIn = (state: RootState) => state.auth.loggedIn;

export const getSelf = (state: RootState) => ({
    username: state.auth.username,
    id: state.auth.id,
});
