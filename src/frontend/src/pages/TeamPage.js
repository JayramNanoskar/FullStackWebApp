import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

  //The state is just a fancy term for a JavaScript data structure.
  const [team, setTeam] = useState({ matches: [] }); //Initializing state in this component such as defining matches as an empty array & specifying state name i.e. team & function to set state i.e. setTeam
  const { teamName } = useParams(); //Giving an Object with all of the PathParams & Destructuring to get teamName


  useEffect( //Using React Effects to do something when this component load
    () => {
      const fetchTeam = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`); //Need to make await because fetch returns promise & for using await that current function must be async
        const data = await response.json(); //getting actual response
        setTeam(data); //Setting available data to component state

      };
      fetchTeam();

    }, [teamName] //Specifying DependencyList as an teamName in array to tell Calling useEffect on the teamName change
  );


  if (!team || !team.teamName) {
    return <h1>Team not found</h1>
  }

  //JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX converts HTML tags into react elements. We are not required to use JSX, but JSX makes it easier to write React applications.
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">
        Wins / Losses
        <PieChart
          data={[
            { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
            { title: 'Wins', value: team.totalWins, color: '#4da375' },
          ]}
        />
      </div>
      <div className="match-detail-section">
        <h3>Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]}></MatchDetailCard>
      </div>
      {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match}></MatchSmallCard>)}
      <div className="more-link">
        <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
      </div>
    </div>
  );
}
