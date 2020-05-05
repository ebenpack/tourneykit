import * as React from "react";
import { TourneyPageQueryResponse } from "../../__generated__/TourneyPageQuery.graphql";

const bezierByH = (x0: number, y0: number, x1: number, y1: number): string => {
    const mx = x0 + (x1 - x0) / 2;
    return `M${x0} ${y0} C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
};

const matchDetails = (match, roundWidth: number, roundHeight: number, rectHeight: number) => {
    const leftOffset = (match.round - 1) * roundWidth;
    const teamOneTopOffset = (match.seed - 1) * roundHeight;
    const teamTwoTopOffset = teamOneTopOffset + rectHeight + (roundHeight * 0.10);
    const midPoint = teamOneTopOffset + (roundHeight * 0.10);
    return {leftOffset, teamOneTopOffset, teamTwoTopOffset, midPoint};
}

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
                    // TODO: Should probably just use a chart library for all this
                    // TODO: This is just totally broken right now, lol
                    const {leftOffset, teamOneTopOffset, teamTwoTopOffset, midPoint} = matchDetails(match, roundWidth, roundHeight, rectHeight)
                    const previousMatch = (seed: number, round: number) => tourney.matchSet.edges
                        .find(({ node: match }) => match.seed === seed && match.round === round);
                    let connections = null;
                    if (match.round !== 1) {
                        // Not too efficient
                        const { node: firstPreviousMatch } = previousMatch(match.seed, match.round - 1);
                        const { node: secondPreviousMatch } = previousMatch(match.seed + 1, match.round - 1);
                        const {
                            leftOffset: firstLeftOffset,
                            midPoint: firstMidPoint,
                        } = matchDetails(firstPreviousMatch, roundWidth, roundHeight, rectHeight);
                        const {
                            leftOffset: secondLeftOffset,
                            midPoint: secondMidPoint,
                        } = matchDetails(secondPreviousMatch, roundWidth, roundHeight, rectHeight);
                        connections = (
                            <React.Fragment>
                                <path
                                    d={bezierByH(firstLeftOffset + rectWidth, firstMidPoint, leftOffset, midPoint)}
                                    strokeWidth="4"
                                    fill="transparent"
                                    stroke="lightgray"
                                />
                                <path
                                    d={bezierByH(secondLeftOffset + rectWidth, secondMidPoint, leftOffset, midPoint)}
                                    strokeWidth="4"
                                    fill="transparent"
                                    stroke="lightgray"
                                />
                            </React.Fragment>
                        );
                    }
                    const team2ConnectCoords = {
                        y1: leftOffset
                    };
                    const team1ConnectCoords = {

                    };
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
                            {match.round !== 0 && connections}
                        </React.Fragment>
                    );
                })}
            </svg>
        </React.Fragment>
    );
};

export default Tourney;
