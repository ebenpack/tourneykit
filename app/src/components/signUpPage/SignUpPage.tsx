import * as React from "react";
import { graphql, QueryRenderer, commitMutation } from "react-relay";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import relayEnvironment from "../../relay/environment";
import { logIn } from "../auth/authReducer";
import { isLoggedIn } from "../auth/authSelectors";
import Field from "../form/Field";

import { SignUpPageMutationResponse } from "../../__generated__/SignUpPageMutation.graphql";
import { RootState } from "../app/appStore";
import { User } from "../../types/User";

const { useState, useEffect } = React;

const mutation = graphql`
    mutation SignUpPageMutation(
        $username: String!
        $email: String!
        $password: String!
        $passwordVerify: String!
    ) {
        signUp(
            username: $username
            email: $email
            password: $password
            passwordVerify: $passwordVerify
        ) {
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
    email: string,
    password: string,
    passwordVerify: string,
    setSignUpError: (error: boolean) => void,
    logIn: (user: User) => void
) {
    return commitMutation(relayEnvironment, {
        mutation,
        variables: { username, password, email, passwordVerify },
        onCompleted: (response: SignUpPageMutationResponse, errors) => {
            if (!response.signUp.ok) {
                setSignUpError(true);
            } else {
                logIn(response.signUp.user);
            }
        },
    });
}

interface SignUpPageProps {
    loggedIn: boolean;
    logIn: (user: User) => void;
}

const SignUpPage = ({ logIn, loggedIn }: SignUpPageProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [signUpError, setSignUpError] = useState(false); // TODO: BETTER ERRORS
    const inputClassName = classNames("input", { "has-danger": signUpError });
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
                        if (password !== passwordVerify) {
                            setSignUpError(true);
                        } else {
                            commit(
                                username,
                                email,
                                password,
                                passwordVerify,
                                setSignUpError,
                                logIn
                            );
                        }
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
                        label="Email"
                        name="email"
                        value={email}
                        setValue={setEmail}
                    />
                    <Field
                        inputClassName={inputClassName}
                        label="Password"
                        name="password1"
                        value={password}
                        setValue={setPassword}
                        type="password"
                    />
                    <Field
                        inputClassName={inputClassName}
                        label="Re-Type Password"
                        name="password2"
                        value={passwordVerify}
                        setValue={setPasswordVerify}
                        type="password"
                    />
                    <button className="button">Sign Up</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
