import { React, useEffect, useState } from 'react';

import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    //The state is just a fancy term for a JavaScript data structure.
    const [teams, setTeams] = useState([]); //Initializing state in this component as an empty array & specifying state name i.e. teams & function to set state i.e. setTeams


    useEffect( //Using React Effects to do something when this component load
        () => {
            const fetchAllTeams = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`); //Need to make await because fetch returns promise & for using await that current function must be async
                const data = await response.json(); //getting actual response
                setTeams(data); //Setting available data to component state

            };
            fetchAllTeams();

        }, [] //Specifying DependencyList as an empty array to tell Calling useEffect on the first page load
    );


    if(!teams) return null;

    //JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX converts HTML tags into react elements. We are not required to use JSX, but JSX makes it easier to write React applications.
    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name">JSN IPL Dashboard</h1>
            </div>
            <div className="team-grid">
                    {teams.map(team => <TeamTile key={team.id} teamName={team.teamName}></TeamTile>)}

            </div>

        </div>
    );
}
