import * as React from "react";
import { TourneyPageQueryResponse } from "../../__generated__/TourneyPageQuery.graphql";

type MatchesType = TourneyPageQueryResponse["tourney"]["matchSet"]["edges"];
export type MatchType = MatchesType[0]["node"];
const bezierByH = (x0: number, y0: number, x1: number, y1: number): string => {
    const mx = x0 + (x1 - x0) / 2;
    return `M${x0} ${y0} C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
};
const matchDetails = (
    round: number,
    seed: number,
    roundTopOffset: number,
    roundWidth: number,
    roundHeight: number,
    rectHeight: number
) => {
    const leftOffset = (round - 1) * roundWidth;
    const teamOneTopOffset = (seed - 1) * roundHeight + roundTopOffset;
    const teamTwoTopOffset = teamOneTopOffset + rectHeight + roundHeight * 0.1;
    const midPoint = (teamOneTopOffset + roundHeight * 0.5) - ((roundHeight * 0.1) / 2);
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

export const Matches = ({
    matches,
    roundWidth,
    roundHeight,
    rectHeight,
    bracketWidth,
    bracketHeight,
    rectWidth,
}: MatchesProps) => {
    // Make a map that will be indexable by round and seed
    const rounds = new Map();
    matches.forEach(({ node: match }) => {
        if (!rounds.has(match.round)) {
            rounds.set(match.round, new Map());
        }
        rounds.get(match.round)?.set(
            match.seed,
            new Map([
                ["match", match],
                ["nextMatch", null],
                ["matchDetails", null],
            ])
        );
    });
    // Calculate match offsets and determine next matches for rendering purposes
    rounds.forEach((round, roundNum) => {
        const roundTopOffset =
            ((rounds.get(1).size - round.size) * roundHeight) / 2;
        // any... blarg
        round.forEach((matchMap: any, seedNum: number) => {
            const match = matchMap.get("match");
            let nextMatchFound = !rounds.has(roundNum + 1);
            let nextMatch = null;
            let nextRound = roundNum + 1;
            let nextSeed = Math.floor((match.seed + (match.seed % 2)) / 2);
            while (!nextMatchFound) {
                nextMatch = rounds.get(nextRound)?.get(nextSeed)?.get("match");
                if (nextMatch?.bye) {
                    nextRound += 1;
                    nextSeed = Math.floor((nextSeed + (nextSeed % 2)) / 2);
                } else {
                    nextMatchFound = true;
                }
            }
            matchMap.set(
                "nextMatch",
                (nextMatch && [nextMatch.round, nextMatch.seed]) || null
            );
            matchMap.set(
                "matchDetails",
                matchDetails(
                    match.round,
                    match.seed,
                    roundTopOffset,
                    roundWidth,
                    roundHeight,
                    rectHeight
                )
            );
        });
    });
    return (
        <svg
            version="1.1"
            baseProfile="full"
            width={bracketWidth}
            height={bracketHeight}
            xmlns="http://www.w3.org/2000/svg"
        >
            {Array.from(rounds.entries()).flatMap(([roundNum, round]) =>
                Array.from(round.entries()).map(([seedNum, matchMap]) => {
                    const baseline = "hanging";
                    const match = matchMap.get("match");
                    const nextMatchCoords = matchMap.get("nextMatch");
                    const matchDetails = matchMap.get("matchDetails");
                    let connector = null;
                    const color = match.seed % 2 === 0 ? "#ccc" : "white";
                    if (match.bye && match.round !== 1) {
                        return null;
                    }
                    if (nextMatchCoords) {
                        const [nextRound, nextSeed] = nextMatchCoords;
                        const nextMatchDetails = rounds
                            .get(nextRound)
                            .get(nextSeed)
                            .get("matchDetails");
                        connector = (
                            <path
                                d={bezierByH(
                                    nextMatchDetails.leftOffset,
                                    nextMatchDetails.midPoint,
                                    matchDetails.leftOffset + rectWidth,
                                    matchDetails.midPoint
                                )}
                                strokeWidth="4"
                                fill="transparent"
                                stroke="lightgray"
                            />
                        );
                    }
                    return (
                        <React.Fragment key={`${match.round}|${match.seed}`}>
                            <rect
                                x={matchDetails.leftOffset}
                                y={matchDetails.teamOneTopOffset}
                                width={rectWidth}
                                height={rectHeight}
                                stroke="black"
                                fill={color}
                            />
                            <text
                                x={matchDetails.leftOffset + 2}
                                y={matchDetails.teamOneTopOffset}
                                alignmentBaseline={baseline}
                                dominantBaseline={baseline}
                            >
                                {match.team1?.team?.name}
                            </text>
                            <rect
                                x={matchDetails.leftOffset}
                                y={matchDetails.teamTwoTopOffset}
                                width={rectWidth}
                                height={rectHeight}
                                stroke="black"
                                fill={color}
                            />
                            <text
                                x={matchDetails.leftOffset + 2}
                                y={matchDetails.teamTwoTopOffset}
                                alignmentBaseline={baseline}
                                dominantBaseline={baseline}
                            >
                                {match.team2?.team?.name}
                            </text>
                            {connector}
                        </React.Fragment>
                    );
                })
            )}
        </svg>
    );
};
