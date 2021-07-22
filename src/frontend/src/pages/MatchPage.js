import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

export const MatchPage = () => {

  const [matches, setMatches] = useState([]);
  const {teamName, year } = useParams();


  useEffect( //Using React Effects to do something when this component load
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`); //Need to make await because fetch returns promise & for using await that current function must be async
        const data = await response.json(); //getting actual response
        setMatches(data); //Setting available data to component state

      };
      fetchMatches();

    }, [teamName, year] //Specifying DependencyList as teamName, year in array to tell Calling useEffect on the teamName or year change
  );


  //JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX converts HTML tags into react elements. We are not required to use JSX, but JSX makes it easier to write React applications.
  return (
    <div className="MatchPage">
      <div className="year-selector">
        <h3>Select Year</h3>
        <YearSelector teamName={teamName}></YearSelector>
      </div>
      <div>
        <h1 className="page-heading">{teamName} Matches in {year}</h1>
        {
          matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match}></MatchDetailCard>)
        }
      </div>
    </div>
  );
}
