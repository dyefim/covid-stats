import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import About from './pages/About';
import ByCountryAfterDate from './pages/ByCountryAfterDate';
import World from './pages/World';
import makeRequest from './utils/makeRequest';
import { getTodayDate, getYesterday } from './utils/dates';

export interface Filters {
  date_from: string;
  date_to: string;
  case: 'confirmed' | 'recovered' | 'deaths';
}

const App = () => {
  const [filters, setFilters] = useState<Filters>({
    date_from: getYesterday(),
    date_to: getTodayDate(),
    case: 'confirmed',
  });

  useEffect(() => {
    const baseUrl = 'https://api.covid19api.com';
    makeRequest(
      `${baseUrl}/world?from=${filters.date_from}&to=${filters.date_to}`
    );
  }, [filters]);

  return (
    <div className="App">
      <header>СOVID Stats</header>
      <Router>
        <div>
          <Navigation />

          <hr />

          <Switch>
            <Route exact path="/">
              <World filters={filters} setFilters={setFilters} />
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
