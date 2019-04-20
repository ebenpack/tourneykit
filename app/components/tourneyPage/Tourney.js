import React, { Fragment } from 'react';

const Tourney = ({ tourney }) => {
    return (
        <React.Fragment>
            <h2>{tourney.name}</h2>
            <h3>Teams</h3>
            <ul>
                { tourney.teams.map(team => <li>{team.name}</li>) }
            </ul>
            <h3>Matches</h3>
            <ul>
                { tourney.matchSet.map(match => <li>{match.round}</li>) }
            </ul>

        </React.Fragment>
    );
};

            // tourney.game
            // tourney.teams
            // tourney.matchSet

export default Tourney;
