import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import About from './pages/About';
import ByCountryAfterDate from './pages/ByCountryAfterDate';
import World from './pages/WorldPage';
import makeRequest from './utils/makeRequest';
import { getTodayDate, getYesterday, jumpDays } from './utils/dates';

export interface Filters {
  date_from: string;
  date_to: string;
  cases: 'confirmed' | 'recovered' | 'deaths';
}

export interface FiltersByCountry {
  date_from: string;
  country: string;
  cases: 'confirmed' | 'recovered' | 'deaths';
}

const baseUrl = 'https://api.covid19api.com';

const App = () => {
  const today = getTodayDate();

  const [globalFilters, setGlobalFilters] = useState<Filters>({
    date_from: jumpDays(today, -7),
    date_to: today,
    cases: 'confirmed', // TODO extract to own useState
  });

  const [filtersByCountry, setFiltersByCountry] = useState<FiltersByCountry>({
    date_from: getYesterday(),
    country: 'ukraine',
    cases: 'confirmed',
  });

  const [globalData, setGlobalData] = useState([]);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const getData = async () => {
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

      setGlobalData(responseData);
    };

    getData();
  }, [globalFilters]);

  useEffect(() => {
    const getData = async () => {
      const responseData = await makeRequest(
        `${baseUrl}/live/country/${filtersByCountry.country}/status/${filtersByCountry.cases}/date/${filtersByCountry.date_from}`
      );

      console.log(responseData);

      setCountryData(responseData);
    };

    getData();
  }, [filtersByCountry]);

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
                data={globalData}
                globalFilters={globalFilters}
                setGlobalFilters={setGlobalFilters}
              />
            </Route>
            <Route path="/by-country-after-date">
              <ByCountryAfterDate
                data={countryData}
                filtersByCountry={filtersByCountry}
                setFiltersByCountry={setFiltersByCountry}
              />
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
