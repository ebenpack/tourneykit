import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const DashboardPage = () => {
	return (
		<Query
			query={gql`
				{
					tourneys {
						id
						name
					}
				}
			`}
		>
			{({ loading, error, data }) => {
				return (
					<Fragment>
						<h2>Tournaments</h2>
						{ loading
							? <p>Loading tournaments...</p>
							: (
								data.tourneys.map((tourney) => {
									return <p key={tourney.id}>{ tourney.name }</p>;
								})
							)
						}
					</Fragment>
				);
			}}
		</Query>
	);
};

export default DashboardPage;
