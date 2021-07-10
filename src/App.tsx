import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import makeRequest from './utils/makeRequest';
import { appendToState } from './utils/stateMutations';
import { getTodayDate, jumpDays } from './utils/dates';
import { getLocalState, saveToLocalState } from './utils/localStorage';
import Routes from './pages/Routes';

export type Cases = 'confirmed' | 'recovered' | 'deaths';

export interface Filters {
  date_from: string;
  date_to: string;
  cases: Cases;
}

export interface FiltersForLiveData {
  date_from: string;
  // country: string;
  cases: Cases;
}

export interface Country {
  Country: string;
  Slug: string;
  ISO2: string;
}

const baseUrl = 'https://api.covid19api.com';

const App = () => {
  const today = getTodayDate();

  const [globalFilters, setGlobalFilters] = useState<Filters>({
    date_from: jumpDays(today, -7),
    date_to: today,
    cases: 'confirmed', // TODO extract to own useState
  });

  const [filtersForLiveData, setFiltersForLiveData] =
    useState<FiltersForLiveData>({
      date_from: jumpDays(today, -7),
      // country: 'ukraine',
      cases: 'confirmed',
    });

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountriesList = async () => {
      const responseData = await makeRequest(`${baseUrl}/countries`);

      setCountries(responseData);
    };

    getCountriesList();
  }, []);

  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    () => getLocalState('selectedCountries') || ['ukraine', 'russia']
  );

  useEffect(() => {
    saveToLocalState('selectedCountries', selectedCountries);
  }, [selectedCountries]);

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
        `${baseUrl}/live/country/${country}/status/${filtersForLiveData.cases}/date/${filtersForLiveData.date_from}`
      );

      return responseData;
    };

    setCountriesDataByDate({});

    selectedCountries.forEach(async (country) => {
      const response = await getDataByCounry(country);

      setCountriesDataByDate((state) => appendToState(state, response));
    });
  }, [
    selectedCountries,
    filtersForLiveData.cases,
    filtersForLiveData.date_from,
  ]);

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
            countries={countries}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            countriesDataByDate={countriesDataByDate}
            filtersForLiveData={filtersForLiveData}
            setFiltersForLiveData={setFiltersForLiveData}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
