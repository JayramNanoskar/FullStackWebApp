import './App.scss';
import { TeamPage } from './pages/TeamPage';
import { MatchPage } from './pages/MatchPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/teams/:teamName">
            <TeamPage></TeamPage>
          </Route>
          <Route exact path="/teams/:teamName/matches/:year">
            <MatchPage></MatchPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
