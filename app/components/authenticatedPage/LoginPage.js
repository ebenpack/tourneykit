import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

import { setAuthToken, setUsername } from './authReducer';

const LOGIN = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const LoginPage = ({ setToken, setName }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Mutation
            mutation={LOGIN} 
            onCompleted={({ tokenAuth: { token } }) => {
                    setToken(token);
                    setName(username);
                    window.localStorage ? window.localStorage.setItem('JWT', token) : null;
                }
            }
        >
            {login => {
                return (
                    <form onSubmit={e => { e.preventDefault(); login({ variables: { username, password } }) }}>
                        <input value={username} onChange={e => setUsername(e.target.value)} />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button>Log in</button>
                    </form>
                );
            }}
        </Mutation>
    );
};

const mapDispatchToProps = {
    setToken: setAuthToken,
    setName: setUsername
};

export default connect(null, mapDispatchToProps)(LoginPage);
