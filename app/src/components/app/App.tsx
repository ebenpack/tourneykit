import * as React from "react";
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { connect, Provider } from "react-redux";

import appStore from "./appStore";

import { logIn } from "../auth/authReducer";
import relayEnvironment from "../../relay/environment";

import DashboardPage from "../dashboardPage/DashboardPage";
import TourneyPage from "../tourneyPage/TourneyPage";
import TourneyListPage from "../tourneyListPage/TourneyListPage";
import LoginPage from "../loginPage/LoginPage";
import LogoutPage from "../logoutPage/LogoutPage";
import SignUpPage from "../signUpPage/SignUpPage";
import Nav from "./Nav";

import {
    AppQueryVariables,
    AppQueryResponse,
    AppQuery,
} from "../../__generated__/AppQuery.graphql";

import { ErrorType, ErrorMessage } from "../../relay/errorType";
import { User } from "../../types/User";

// TODO: CLEAN UP!

const AppContainer = () => {
    return (
        <Provider store={appStore}>
            <Router>
                <AppQuery />
            </Router>
        </Provider>
    );
};

const App = () => {
    return (
        <section className="section">
            <div className="container">
                <Nav />
                <div id="app">
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/logout" component={LogoutPage} />
                        <Route exact path="/signup" component={SignUpPage} />
                        <Route
                            exact
                            path="/tourney"
                            component={TourneyListPage}
                        />
                        <Route
                            exact
                            path="/tourney/:id"
                            component={TourneyPage}
                        />
                        <Route exact path="/" component={DashboardPage} />
                    </Switch>
                </div>
            </div>
        </section>
    );
};

const appQuery = graphql`
    query AppQuery {
        me {
            username
            id
        }
    }
`;

interface RenderAppProps {
    logIn: (user: User) => void;
    error: Error;
    props: AppQueryResponse;
}

const RenderApp = ({ error, props, logIn }: RenderAppProps) => {
    if (error) {
        return <div>{error.message}</div>;
    } else if (props) {
        if (props.me) {
            logIn(props.me);
        }
        return <App />;
    }
    return <div>Loading tourneys...</div>;
};

const mapDispatchToProps = {
    logIn,
};

const ConnectedRenderApp = connect(null, mapDispatchToProps)(RenderApp);

const AppQuery = () => (
    <QueryRenderer<AppQuery>
        environment={relayEnvironment}
        query={appQuery}
        render={({ error, props }) => (
            <ConnectedRenderApp error={error} props={props} />
        )}
        variables={{}}
    />
);

export default AppContainer;
