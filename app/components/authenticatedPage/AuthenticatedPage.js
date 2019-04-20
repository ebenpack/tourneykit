import React from 'react';
import { connect } from 'react-redux';

import Login from './LoginPage';

export const AuthenticatedPage = ({ isAuthenticated, NonAuthenticatedPage, children, ...props }) => (
    isAuthenticated
        ? children
        : NonAuthenticatedPage
            ? <NonAuthenticatedPage {...props} />
            : <Login />
);

export const mapStateToProps = state => ({
    isAuthenticated: state.auth.hasOwnProperty('authToken')
});

export default connect(mapStateToProps)(AuthenticatedPage)
