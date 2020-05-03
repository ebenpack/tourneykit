import { Record } from "immutable";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

interface LogInMessageAction {
    type: typeof LOG_IN;
    userName: string;
}

interface LogOutMessageAction {
    type: typeof LOG_OUT;
}

export type AuthActionTypes = LogInMessageAction | LogOutMessageAction;

export const logIn = (userName: string): AuthActionTypes => ({
    type: LOG_IN,
    userName,
});

export const logOut = (): AuthActionTypes => ({
    type: LOG_OUT,
});

interface IAuthRecord {
    userName: string;
    loggedIn: boolean;
}

const defaultAuthRecords: IAuthRecord = { userName: null, loggedIn: false };

export interface AuthParams {
    userName?: string;
    loggedIn?: boolean;
}

export class AuthRecord extends Record(defaultAuthRecords)
    implements IAuthRecord {
    constructor(params?: AuthParams) {
        params ? super(params) : super();
    }
}

const initialState = new AuthRecord();

const authReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthRecord => {
    switch (action.type) {
        case LOG_IN: {
            return state.merge({
                userName: action.userName,
                loggedIn: true,
            });
        }
        case LOG_OUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default authReducer;
