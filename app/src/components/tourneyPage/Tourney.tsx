import * as React from "react";
import { TourneyPageQueryResponse } from "../../__generated__/TourneyPageQuery.graphql";

const Tourney = ({ tourney }: TourneyPageQueryResponse) => {
    return (
        <React.Fragment>
            <h2 className="title">{tourney.name}</h2>
            <h3 className="title">Teams</h3>
            <ul>
                {tourney.teams.edges.map(({ node: team }) => (
                    <li key={team.id}>{team.name}</li>
                ))}
            </ul>
            <h3 className="title">Matches</h3>
            <ul>
                {tourney.matchSet.edges
                    .map(({ node: match }) => (
                    <li key={match.id}>{`Round: ${match.round} | Completed: ${match.completed}
                    | Team 1: ${match.team1?.team?.name} | Team 2: ${match.team2?.team?.name} | Winner: ${match.winner}`}</li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default Tourney;
