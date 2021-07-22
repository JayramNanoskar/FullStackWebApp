import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';


export const MatchPage = () => {

  const [matches, setMatches] = useState([]);
  const {teamName, year } = useParams();


  useEffect( //Using React Effects to do something when this component load
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`); //Need to make await because fetch returns promise & for using await that current function must be async
        const data = await response.json(); //getting actual response
        setMatches(data); //Setting available data to component state

      };
      fetchMatches();

    }, [] //Specifying DependencyList as an empty array to tell Calling useEffect on the first page load
  );


  //JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX converts HTML tags into react elements. We are not required to use JSX, but JSX makes it easier to write React applications.
  return (
    <div className="TeamPage">
      <h1>Match Page</h1>
      {
        matches.map(match => <MatchDetailCard teamName={teamName} match={match}></MatchDetailCard>)
      }

    </div>
  );
}
