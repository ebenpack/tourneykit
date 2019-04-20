import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Tourney from './Tourney';
import AuthenticatedPage from '../authenticatedPage/AuthenticatedPage';

const TourneyPage = ({ match: { params: { id } } }) => {
	return (
		<Query
            query={gql`
                query Tourney($tourneyId: Int!) {
                    tourney(id: $tourneyId) {
                        id
                        name
                        game {
                            id
                        }
                        teams {
                            id,
                            name
                            competitorSet {
                                id
                            }
                        }
                        matchSet {
                            id
                            round
                        }
                    }
                }
          `}
            variables={{ tourneyId: parseInt(id, 10) }}
		>
			{({ loading, error, data }) => {
				return (
					<Fragment>
						<h2>Tourney</h2>
						{ loading
							? <p>Loading tourney...</p>
							: <Tourney tourney={data.tourney} />
						}
					</Fragment>
				);
			}}
		</Query>
	);
};

const AuthenticatedTourneyPage = props => <AuthenticatedPage><TourneyPage {...props} /></AuthenticatedPage>

export default AuthenticatedTourneyPage;
