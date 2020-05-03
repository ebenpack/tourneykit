import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { isLoggedIn } from "../auth/authSelectors";
import { RouteComponentProps, RouteProps } from "react-router";
import { RootState } from "../app/appStore";

type AuthenticatedPageProps = {
    isAuthenticated: boolean;
    NonAuthenticatedPage: React.ComponentType;
    children: React.ReactNode;
};

class AuthenticatedPage2 extends React.Component<AuthenticatedPageProps, {}> {
    render() {
        const {
            isAuthenticated,
            NonAuthenticatedPage,
            children,
            ...props
        } = this.props;
        return isAuthenticated ? (
            children
        ) : NonAuthenticatedPage ? (
            <NonAuthenticatedPage {...props} />
        ) : (
            <Redirect to="/login" />
        );
    }
}

export const mapStateToProps = (state: RootState) => ({
    isAuthenticated: isLoggedIn(state),
});

export default connect(mapStateToProps)(AuthenticatedPage2);
