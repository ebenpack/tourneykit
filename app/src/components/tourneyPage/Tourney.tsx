import * as React from "react";

import { TourneyPageQueryResponse } from "../../__generated__/TourneyPageQuery.graphql";
import { Matches } from "./Match";

const Tourney = ({ tourney }: TourneyPageQueryResponse) => {
    const totalRounds = Math.max(
        ...tourney.matchSet.edges.map(({ node: match }) => match.round)
    );
    const maxMatchesPerRound = Math.max(
        ...tourney.matchSet.edges.map(({ node: match }) => match.seed)
    );
    const bracketWidth = 1000;
    const bracketHeight = 400;
    const roundWidth = bracketWidth / totalRounds;
    const roundHeight = bracketHeight / maxMatchesPerRound;
    const rectHeight = (roundHeight * 0.8) / 2;
    const rectWidth = roundWidth * 0.8;
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
            <Matches
                matches={tourney.matchSet.edges}
                roundWidth={roundWidth}
                roundHeight={roundHeight}
                rectHeight={rectHeight}
                bracketWidth={bracketWidth}
                bracketHeight={bracketHeight}
                rectWidth={rectWidth}
            />
        </React.Fragment>
    );
};

export default Tourney;
