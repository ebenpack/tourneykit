export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const SET_USERNAME = 'SET_USERNAME';

export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const setUsername = userName => ({
    type: SET_USERNAME,
    userName
});

export const logOut = authToken => setAuthToken(null);

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_TOKEN: {
            return { ...state, authToken: action.authToken };
        }
        case SET_USERNAME: {
            return { ...state, username: action.userName };
        }
        default: {
            return state;
        }
    }
};

export default authReducer;
