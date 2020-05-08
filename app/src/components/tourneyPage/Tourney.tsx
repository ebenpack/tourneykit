import * as React from "react";
import { TourneyPageQueryResponse } from "../../__generated__/TourneyPageQuery.graphql";

type MatchesType = TourneyPageQueryResponse["tourney"]["matchSet"]["edges"];

type MatchType = MatchesType[0]["node"];

const bezierByH = (x0: number, y0: number, x1: number, y1: number): string => {
    const mx = x0 + (x1 - x0) / 2;
    return `M${x0} ${y0} C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
};

const matchDetails = (
    round: number,
    seed: number,
    roundWidth: number,
    roundHeight: number,
    rectHeight: number
) => {
    const leftOffset = (round - 1) * roundWidth;
    const teamOneTopOffset = (seed - 1) * roundHeight;
    const teamTwoTopOffset = teamOneTopOffset + rectHeight + roundHeight * 0.1;
    const midPoint = teamOneTopOffset + roundHeight * 0.5;
    return { leftOffset, teamOneTopOffset, teamTwoTopOffset, midPoint };
};

interface MatchesProps {
    matches: MatchesType;
    roundWidth: number;
    roundHeight: number;
    rectHeight: number;
    bracketWidth: number;
    bracketHeight: number;
    rectWidth: number;
}

const Matches = ({
    matches,
    roundWidth,
    roundHeight,
    rectHeight,
    bracketWidth,
    bracketHeight,
    rectWidth,
}: MatchesProps) => {
    let matchesInRound = 0;
    matches.forEach(({ node: match }) => {
        // TODO: Throw stuff in a more easily indexable DS... you know... for performance
        if (match.round === 1) {
            matchesInRound = Math.max(matchesInRound, match.seed);
        }
    });
    return (
        <svg
            version="1.1"
            baseProfile="full"
            width={bracketWidth}
            height={bracketHeight}
            xmlns="http://www.w3.org/2000/svg"
        >
            {matches.map(({ node: match }) => {
                // TODO: Should probably just use a chart library for all this
                // TODO: This is just totally broken right now, lol
                const {
                    leftOffset,
                    teamOneTopOffset,
                    teamTwoTopOffset,
                    midPoint,
                } = matchDetails(
                    match.round,
                    match.seed,
                    roundWidth,
                    roundHeight,
                    rectHeight
                );
                const previousMatch = (seed: number, round: number) =>
                    matches.find(
                        ({ node: match }) =>
                            match.seed === seed && match.round === round
                    );
                let connections = null;
                const color = match.seed % 2 === 0 ? "#ccc" : "white";
                if (match.round !== 1) {
                    // Not too efficient
                    const { node: firstPreviousMatch } = previousMatch(
                        match.seed * 2 - 1,
                        match.round - 1
                    );
                    const { node: secondPreviousMatch } = previousMatch(
                        match.seed * 2,
                        match.round - 1
                    );
                    const {
                        leftOffset: firstLeftOffset,
                        midPoint: firstMidPoint,
                    } = matchDetails(
                        firstPreviousMatch.round,
                        firstPreviousMatch.seed,
                        roundWidth,
                        roundHeight,
                        rectHeight
                    );
                    const {
                        leftOffset: secondLeftOffset,
                        midPoint: secondMidPoint,
                    } = matchDetails(
                        secondPreviousMatch.round,
                        secondPreviousMatch.seed,
                        roundWidth,
                        roundHeight,
                        rectHeight
                    );
                    connections = (
                        <React.Fragment>
                            <path
                                d={bezierByH(
                                    firstLeftOffset + rectWidth,
                                    firstMidPoint,
                                    leftOffset,
                                    midPoint
                                )}
                                strokeWidth="4"
                                fill="transparent"
                                stroke="lightgray"
                            />
                            <path
                                d={bezierByH(
                                    secondLeftOffset + rectWidth,
                                    secondMidPoint,
                                    leftOffset,
                                    midPoint
                                )}
                                strokeWidth="4"
                                fill="transparent"
                                stroke="lightgray"
                            />
                        </React.Fragment>
                    );
                }
                return (
                    <React.Fragment key={`${match.round}|${match.seed}`}>
                        <rect
                            x={leftOffset}
                            y={teamOneTopOffset}
                            width={rectWidth}
                            height={rectHeight}
                            stroke="black"
                            fill={color}
                        />
                        <text
                            x={leftOffset}
                            y={teamOneTopOffset + rectHeight / 2}
                        >
                            {match.team1?.team?.name}
                        </text>
                        <rect
                            x={leftOffset}
                            y={teamTwoTopOffset}
                            width={rectWidth}
                            height={rectHeight}
                            stroke="black"
                            fill={color}
                        />
                        <text
                            x={leftOffset}
                            y={teamTwoTopOffset + rectHeight / 2}
                        >
                            {match.team2?.team?.name}
                        </text>
                        {match.round !== 0 && connections}
                    </React.Fragment>
                );
            })}
        </svg>
    );
};

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
