import * as React from "react";
import { QueryRenderer, graphql } from "react-relay";
import { Link } from "react-router-dom";

import relayEnvironment from "../../relay/environment";

import {
    TourneyListPageQuery,
    TourneyListPageQueryResponse,
} from "../../__generated__/TourneyListPageQuery.graphql";
import { ErrorType } from "../../relay/errorType";

const tourneyListPageQuery = graphql`
    query TourneyListPageQuery {
        tourneys(first: 10) {
            edges {
                node {
                    id
                    name
                    game {
                        id
                    }
                }
            }
        }
    }
`;

interface RenderTourneysPageProps {
    error: Error;
    props: TourneyListPageQueryResponse;
}

const RenderTourneysPage = ({ error, props }: RenderTourneysPageProps) => {
    if (error) {
        return <div>{error.message}</div>;
    } else if (props) {
        return (
            <div>
                {props.tourneys.edges.map((tourney) => (
                    <div key={tourney.node.id}>
                        <Link to={`/tourney/${tourney.node.id}`}>
                            {tourney.node.name}
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
    return <div>Loading tourneys...</div>;
};

const TourneyListPage = () => (
    <QueryRenderer<TourneyListPageQuery>
        environment={relayEnvironment}
        query={tourneyListPageQuery}
        variables={{}}
        render={({ error, props }) => (
            <RenderTourneysPage error={error} props={props} />
        )}
    />
);

export default TourneyListPage;
