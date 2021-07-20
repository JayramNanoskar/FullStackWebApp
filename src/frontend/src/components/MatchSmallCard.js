import { React } from 'react';
import { Link } from 'react-router-dom';

export const MatchSmallCard = ({teamName, match }) => { //Accepting a parameters & making Object Destructuring
    if (!match) return null; //Telling if parameter match is null then don't do anything

    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;

    return (
        <div className="MatchSmallCard">
            <h3>vs <Link to={otherTeamRoute}>{otherTeam}</Link></h3>
            <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
        </div>
    );
}
