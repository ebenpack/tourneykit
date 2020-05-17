import { Record } from "immutable";
import { User } from "../../types/User";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

interface LogInMessageAction {
    type: typeof LOG_IN;
    username: string;
    id: string;
}

interface LogOutMessageAction {
    type: typeof LOG_OUT;
}

export type AuthActionTypes = LogInMessageAction | LogOutMessageAction;

export const logIn = (user: User): AuthActionTypes => ({
    type: LOG_IN,
    username: user.username,
    id: user.id,
});

export const logOut = (): AuthActionTypes => ({
    type: LOG_OUT,
});

interface IAuthRecord {
    username: string;
    id: string;
    loggedIn: boolean;
}

const defaultAuthRecords: IAuthRecord = {
    username: null,
    loggedIn: false,
    id: null,
};

export interface AuthParams {
    username?: string;
    id?: string;
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
                username: action.username,
                id: action.id,
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
