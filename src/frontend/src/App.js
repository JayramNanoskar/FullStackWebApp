import './App.scss';
import { TeamPage } from './pages/TeamPage';
import { MatchPage } from './pages/MatchPage';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { HomePage } from './pages/HomePage';

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
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
