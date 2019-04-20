import React, { Fragment } from 'react';

const Tourney = ({ tourney }) => {
    return (
        <Fragment>
            <h2>{tourney.name}</h2>
            <h3>Teams</h3>
            <ul>
                { tourney.teams.map(team => <li key={team.id}>{team.name}</li>) }
            </ul>
            <h3>Matches</h3>
            <ul>
                { tourney.matchSet.map(match => <li key={match.id}>{match.round}</li>) }
            </ul>
        </Fragment>
    );
};

export default Tourney;
