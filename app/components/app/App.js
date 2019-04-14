import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const AppContainer = () => {
	return (
		<Provider store={store}>
			<Router baseName="/">
				<App {...this.props} />
			</Router>
		</Provider>
	);
};

const App = () => {
	return (
		<div className="wrap">
			<div className="app">

			</div>
		</div>
	);
};

export default AppContainer;
