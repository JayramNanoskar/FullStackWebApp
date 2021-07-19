import { React, useEffect, useState } from 'react';

export const TeamPage = () => {

  //The state is just a fancy term for a JavaScript data structure.
  const [team, setTeam] = useState({}); //Initializing state in this component as an empty object & specifying state name i.e. team & function to set state i.e. setTeam


  useEffect( //Using React Effects to do something when this component load
    () => {
      const fetchMatches = async () => {
        const response = await fetch('http://localhost:8080/team/Mumbai%20Indians'); //Need to make await because fetch returns promise & for using await that current function must be async
        const data = await response.json(); //getting actual response
        setTeam(data); //Setting available data to component state

      };
      fetchMatches();

    }, [] //Specifying DependencyList as an empty array to tell Calling useEffect on the first page load
  );


  //JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX converts HTML tags into react elements. We are not required to use JSX, but JSX makes it easier to write React applications.
  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      
    </div>
  );
}
