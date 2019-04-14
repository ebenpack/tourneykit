import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import DashboardPage from '../dashboardPage/DashboardPage';


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
			<header></header>
			<div className="app">
				<Route path="/" component={DashboardPage} />
			</div>
			<footer></footer>
		</div>
	);
};

export default AppContainer;
