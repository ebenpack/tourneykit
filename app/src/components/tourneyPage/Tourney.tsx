import * as React from "react";
import {TourneyPageQueryResponse} from "../../__generated__/TourneyPageQuery.graphql";

const Tourney = ({ tourney }: TourneyPageQueryResponse) => {
    return (
        <React.Fragment>
            <h2>{tourney.name}</h2>
            <h3>Teams</h3>
            <ul>
                {tourney.teams.edges.map(({ node: team }) => (
                    <li key={team.id}>{team.name}</li>
                ))}
            </ul>
            <h3>Matches</h3>
            <ul>
                {tourney.matchSet.edges.map(({ node: match }) => (
                    <li key={match.id}>{match.round}</li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default Tourney;
