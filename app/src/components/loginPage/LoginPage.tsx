import * as React from "react";
import { graphql, QueryRenderer, commitMutation } from "react-relay";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import relayEnvironment from "../../relay/environment";
import { logIn } from "../auth/authReducer";
import { isLoggedIn } from "../auth/authSelectors";
import Field from "../form/Field";
import { RootState } from "../app/appStore";

import { LoginPageMutationResponse } from "../../__generated__/LoginPageMutation.graphql";
import {User} from "../../types/User";

const { useState, useEffect } = React;

const mutation = graphql`
    mutation LoginPageMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            user {
                username
                id
            }
        }
    }
`;

function commit(
    username: string,
    password: string,
    setLoginError: (error: boolean) => void,
    logIn: (user: User) => void
) {
    return commitMutation(relayEnvironment, {
        mutation,
        variables: { username, password },
        onCompleted: (response: LoginPageMutationResponse, errors) => {
            if (!response.login.ok) {
                setLoginError(true);
            } else {
                logIn(response.login.user);
            }
        },
    });
}

interface LoginPageProps {
    loggedIn: boolean;
    logIn: (user: User) => void;
}

const LoginPage = ({ logIn, loggedIn }: LoginPageProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const inputClassName = classNames("input", { "has-danger": loginError });
    if (loggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className="columns">
            <div className="column is-one-third">
                <form
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        commit(username, password, setLoginError, logIn);
                    }}
                >
                    <Field
                        inputClassName={inputClassName}
                        label="Username"
                        name="username"
                        value={username}
                        setValue={setUsername}
                    />
                    <Field
                        inputClassName={inputClassName}
                        label="Password"
                        name="password"
                        value={password}
                        setValue={setPassword}
                        type="password"
                    />
                    <button className="button">Log in</button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    loggedIn: isLoggedIn(state),
});

const mapDispatchToProps = {
    logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
