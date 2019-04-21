import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux'

import DashboardPage from '../dashboardPage/DashboardPage';
import TourneyPage from '../tourneyPage/TourneyPage';

const AppContainer = ({ apolloClient, store }) => {
	return (
		<ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
		</ApolloProvider>
	);
};

const App = () => {
	return (
		<div className="wrap">
			<header>
				<h1>Tourneykit!</h1>
			</header>
			<div className="app">
				<Route exact path="/" component={DashboardPage} />
                <Route path="/tourney/:id" component={TourneyPage} />
			</div>
			<footer></footer>
		</div>
	);
};

export default AppContainer;
