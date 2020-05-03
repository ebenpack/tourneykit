import * as React from "react";
import { graphql, QueryRenderer, commitMutation } from "react-relay";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import relayEnvironment from "../../relay/environment";
import { logOut } from "../auth/authReducer";
import { isLoggedIn } from "../auth/authSelectors";

import { LogoutPageMutationResponse } from "../../__generated__/LogoutPageMutation.graphql";
import { RootState } from "../app/appStore";

const { useState, useEffect } = React;

const logoutPageMutation = graphql`
    mutation LogoutPageMutation {
        logout {
            ok
        }
    }
`;

function commit(setLogoutError: (error: boolean) => void, logOut: () => void) {
    return commitMutation(relayEnvironment, {
        mutation: logoutPageMutation,
        variables: {},
        onCompleted: (response: LogoutPageMutationResponse, errors) => {
            if (!response.logout.ok) {
                setLogoutError(true);
            } else {
                logOut();
            }
        },
    });
}

interface LogoutPageProps {
    loggedIn: boolean;
    logOut: () => void;
}

const LogoutPage = ({ logOut, loggedIn }: LogoutPageProps) => {
    const [logoutError, setLogoutError] = useState(false);
    const inputClassName = classNames("input", { "has-danger": logoutError });
    useEffect(() => {
        commit(setLogoutError, logOut);
    }, []);
    // TODO: SPINNER!
    return (
        <div className="columns">
            <div className="column is-one-third">
                {!loggedIn && "You have been logged out!"}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    loggedIn: isLoggedIn(state),
});

const mapDispatchToProps = {
    logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
