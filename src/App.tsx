import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import About from './pages/About';
import ByCountryAfterDate from './pages/ByCountryAfterDate';
import World from './pages/WorldPage';
import makeRequest from './utils/makeRequest';
import { getTodayDate, jumpDays } from './utils/dates';

export interface Filters {
  date_from: string;
  date_to: string;
  cases: 'confirmed' | 'recovered' | 'deaths';
}

const App = () => {
  const today = getTodayDate();

  const [globalFilters, setGlobalFilters] = useState<Filters>({
    date_from: jumpDays(today, -7),
    date_to: today,
    cases: 'confirmed', // TODO extract to own useState
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const baseUrl = 'https://api.covid19api.com';

      // if (globalFilters.date_from > globalFilters.date_to) {
      //   alert('Please, enter valid date range!');

      //   setGlobalFilters({
      //     ...globalFilters,
      //     date_to: getNextDay(globalFilters.date_from),
      //   });
      //   return;
      // }

      const responseData = await makeRequest(
        `${baseUrl}/world?from=${globalFilters.date_from}&to=${globalFilters.date_to}`
      );

      setData(responseData);
    };

    getData();
  }, [globalFilters]);

  return (
    <div className="App">
      <header>СOVID Stats</header>
      <Router>
        <div>
          <Navigation />

          <hr />

          <Switch>
            <Route exact path="/">
              <World
                data={data}
                globalFilters={globalFilters}
                setGlobalFilters={setGlobalFilters}
              />
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
