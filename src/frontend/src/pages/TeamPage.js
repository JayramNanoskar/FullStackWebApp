import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

  //The state is just a fancy term for a JavaScript data structure.
  const [team, setTeam] = useState({matches: []}); //Initializing state in this component such as defining matches as an empty array & specifying state name i.e. team & function to set state i.e. setTeam
  const { teamName } = useParams(); //Giving an Object with all of the PathParams & Destructuring to get teamName


  useEffect( //Using React Effects to do something when this component load
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8080/team/${teamName}`); //Need to make await because fetch returns promise & for using await that current function must be async
        const data = await response.json(); //getting actual response
        setTeam(data); //Setting available data to component state

      };
      fetchMatches();

    }, [teamName] //Specifying DependencyList as an teamName in array to tell Calling useEffect on the teamName change
  );


  if(!team || !team.teamName){
    return <h1>Team not found</h1>
  }

  //JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX converts HTML tags into react elements. We are not required to use JSX, but JSX makes it easier to write React applications.
  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard teamName={team.teamName} match={team.matches[0]}></MatchDetailCard>
      {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match}></MatchSmallCard>)}
    </div>
  );
}