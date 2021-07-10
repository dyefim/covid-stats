import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import makeRequest from './utils/makeRequest';
import { appendToState } from './utils/stateMutations';
import { getTodayDate, jumpDays } from './utils/dates';
import Routes from './pages/Routes';

export type Cases = 'confirmed' | 'recovered' | 'deaths';

export interface Filters {
  date_from: string;
  date_to: string;
  cases: Cases;
}

export interface FiltersByCountry {
  date_from: string;
  // country: string;
  cases: Cases;
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
    date_from: jumpDays(today, -7),
    // country: 'ukraine',
    cases: 'confirmed',
  });

  const [countryFilters, setCountryFilters] = useState(['ukraine', 'russia']);

  const [globalData, setGlobalData] = useState([]);
  const [countriesDataByDate, setCountriesDataByDate] = useState({});

  useEffect(() => {
    const getGlobalData = async () => {
      const responseData = await makeRequest(
        `${baseUrl}/world?from=${globalFilters.date_from}&to=${globalFilters.date_to}`
      );

      setGlobalData(responseData);
    };

    getGlobalData();
  }, [globalFilters]);

  useEffect(() => {
    const getDataByCounry = async (country: string) => {
      const responseData = await makeRequest(
        `${baseUrl}/live/country/${country}/status/${filtersByCountry.cases}/date/${filtersByCountry.date_from}`
      );

      return responseData;
    };

    setCountriesDataByDate({});

    countryFilters.forEach(async (country) => {
      const response = await getDataByCounry(country);

      setCountriesDataByDate((state) => appendToState(state, response));
    });
  }, [countryFilters, filtersByCountry.cases, filtersByCountry.date_from]);

  return (
    <div className="App">
      <header>СOVID Stats</header>
      <Router>
        <div>
          <Navigation />

          <hr />

          <Routes
            globalData={globalData}
            globalFilters={globalFilters}
            setGlobalFilters={setGlobalFilters}
            countryFilters={countryFilters}
            countriesDataByDate={countriesDataByDate}
            filtersByCountry={filtersByCountry}
            setFiltersByCountry={setFiltersByCountry}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
