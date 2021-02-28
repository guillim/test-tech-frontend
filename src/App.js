import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import CalendarContainer from './CalendarContainer';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <header className="App-header">
            <p>
              Follow the link bellow to select your meeting. You will be able to choose a time by click on a timeslot (hold your click to selct more than one timelsot).
            </p>
            <Link to='/calendar'>
              <span
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer">here
              </span>
            </Link>
          </header>
        </Route>
        <Route exact path="/calendar">
          <CalendarContainer/>
        </Route>
        <Route path='*'>
          <p>not found</p>
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
