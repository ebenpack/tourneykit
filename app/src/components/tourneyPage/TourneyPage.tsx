import React, { Fragment } from "react";
import { RouteChildrenProps } from "react-router";
import { graphql, QueryRenderer } from "react-relay";

import relayEnvironment from "../../relay/environment";
import AuthenticatedPage from "../authenticatedPage/AuthenticatedPage";
import Tourney from "./Tourney";

import {
    TourneyPageQuery,
    TourneyPageQueryResponse,
} from "../../__generated__/TourneyPageQuery.graphql";
import { TourneyListPageQueryResponse } from "../../__generated__/TourneyListPageQuery.graphql";

const tourneyQuery = graphql`
    query TourneyPageQuery($tourneyId: ID!) {
        tourney(id: $tourneyId) {
            id
            name
            admin {
                id
            }
            game {
                id
                name
            }
            teams {
                edges {
                    node {
                        id
                        name
                        competitorSet {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                }
            }
            matchSet(orderBy: "round,seed") {
                edges {
                    node {
                        id
                        round
                        seed
                        completed
                        bye
                        winner {
                            team {
                                name
                            }
                        }
                        team1 {
                            seed
                            eliminated
                            team {
                                name
                            }
                        }
                        team2 {
                            seed
                            eliminated
                            team {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

interface RenderTourneyPageProps {
    error: Error;
    props: TourneyPageQueryResponse;
}

const RenderTourneyPage = ({ error, props }: RenderTourneyPageProps) => {
    let body;
    if (error) {
        body = <div>{error.message}</div>;
    } else if (props) {
        body = <Tourney tourney={props.tourney} />;
    } else {
        body = <p>Loading tourney...</p>;
    }
    return (
        <Fragment>
            <h2>Tourney</h2>
            {body}
        </Fragment>
    );
};

type TourneyPageRouteProps = {
    id: string;
};

const TourneyPage = (props: RouteChildrenProps<TourneyPageRouteProps>) => (
    <QueryRenderer<TourneyPageQuery>
        environment={relayEnvironment}
        query={tourneyQuery}
        variables={{ tourneyId: props.match.params.id }}
        render={RenderTourneyPage}
    />
);

export const AuthenticatedTourneyPage = (
    props: RouteChildrenProps<TourneyPageRouteProps>
) => (
    <AuthenticatedPage>
        <TourneyPage {...props} />
    </AuthenticatedPage>
);

export default AuthenticatedTourneyPage;
