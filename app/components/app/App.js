import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const AppContainer = () => {
	return (
		<Router>
			<App />
		</Router>
	);
};

const App = () => {
	return (
		<div className="wrap">
			<div className="app">
				hello world
			</div>
		</div>
	);
};

export default AppContainer;
