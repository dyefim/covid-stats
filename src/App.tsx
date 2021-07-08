import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import About from './pages/About';
import ByCountryAfterDate from './pages/ByCountryAfterDate';
import World from './pages/World';
import makeRequest from './utils/makeRequest';

const App = () => {
  useEffect(() => {
    makeRequest(
      'https://api.covid19api.com/world?from=2021-03-01T00:00:00Z&to=2021-04-01T00:00:00Z'
    );
  }, []);

  return (
    <div className="App">
      <header>СOVID Stats</header>
      <Router>
        <div>
          <Navigation />

          <hr />

          <Switch>
            <Route exact path="/">
              <World />
            </Route>
            <Route path="/by-country-after-date">
              <ByCountryAfterDate />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
