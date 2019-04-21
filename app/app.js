import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
import gql from 'graphql-tag';

import store from './components/app/appStore';
import App from './components/app/App';
import { setAuthToken, setUsername } from './components/authenticatedPage/authReducer';

const REFRESH = gql`
    mutation RefreshToken($token: String!) {
        refreshToken(token: $token) {
            token
            payload
        }
    }
`;

window.startApp = async ({ mountPoint }) => {
    const csrfToken = Cookies.get('csrftoken');
    const jwt = window.localStorage ? window.localStorage.getItem('JWT') : null;

    const apolloClient = new ApolloClient({
        uri: '/graphql/',
        headers: {
            'X-CSRFToken': csrfToken
        },
    });
    const appProps = {
        store,
        apolloClient
    };
    if (jwt) {
        const { data }  = await apolloClient.mutate({
            mutation: REFRESH,
            variables: { token: jwt }
        });
        if (data && data.refreshToken) {
            store.dispatch(setAuthToken(data.refreshToken.token));
            store.dispatch(setUsername(data.refreshToken.payload.username));
        }
    }
    ReactDOM.render(<App {...appProps} />, document.getElementById(mountPoint));
};



