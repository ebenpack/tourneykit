import * as React from "react";
import { TourneyPageQueryResponse } from "../../__generated__/TourneyPageQuery.graphql";

const Tourney = ({ tourney }: TourneyPageQueryResponse) => {
    const totalRounds = Math.max(...tourney.matchSet.edges.map(({ node: match }) => match.round));
    const maxMatchesPerRound = Math.max(...tourney.matchSet.edges.map(({ node: match }) => match.seed));
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
            <svg version="1.1"
                 baseProfile="full"
                 width={bracketWidth} height={bracketHeight}
                 xmlns="http://www.w3.org/2000/svg">
                {tourney.matchSet.edges.map(({ node: match }) => {
                    // TODO: Should probably just use a chart library for this
                    const leftOffset = (match.round - 1) * roundWidth;
                    const teamOneTopOffset = (match.seed - 1) * roundHeight;
                    const teamTwoTopOffset = teamOneTopOffset + rectHeight + (roundHeight * 0.10)
                    return (
                        <React.Fragment>
                            <rect
                                x={leftOffset}
                                y={teamOneTopOffset}
                                width={rectWidth}
                                height={rectHeight}
                                stroke="black"
                                fill="#ccc"
                            />
                            <text
                                x={leftOffset}
                                y={teamOneTopOffset + (rectHeight / 2)}
                            >
                                {match.team1?.team?.name}
                            </text>

                            <rect
                                x={leftOffset}
                                y={teamTwoTopOffset}
                                width={rectWidth}
                                height={rectHeight}
                                stroke="black"
                                fill="#ccc"
                            />
                            <text
                                x={leftOffset}
                                y={teamTwoTopOffset + (rectHeight / 2)}
                            >
                                {match.team2?.team?.name}
                            </text>
                        </React.Fragment>
                    );
                })}
            </svg>
        </React.Fragment>
    );
};

export default Tourney;
