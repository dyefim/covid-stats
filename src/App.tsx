import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import { appendToState } from './utils/stateMutations';
import { getTodayDate, jumpDays } from './utils/dates';
import { getLocalState, saveToLocalState } from './utils/localStorage';
import Routes from './pages/Routes';
import requestCountryCases from './services/requestCountryCases';
import requestGlobalData from './services/requestGlobalData';
import requestCountries from './services/requestCountries';

export type CaseType = 'confirmed' | 'recovered' | 'deaths';

export interface GlobalFilters {
  date_from: string;
  date_to: string;
  typeOfCases: CaseType;
}

export interface FiltersForLiveData {
  date_from: string;
  typeOfCases: CaseType;
}

export interface Country {
  Country: string;
  Slug: string;
  ISO2: string;
}


const App = () => {
  const today = getTodayDate();

  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    date_from: jumpDays(today, -7),
    date_to: today,
    typeOfCases: 'confirmed', // TODO extract to own useState
  });

  const [filtersForLiveData, setFiltersForLiveData] =
    useState<FiltersForLiveData>({
      date_from: jumpDays(today, -7),
      typeOfCases: 'confirmed',
    });

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountriesList = async () => {
      const responseData = await requestCountries();

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
      const responseData = await requestGlobalData({ ...globalFilters });

      setGlobalData(responseData);
    };

    getGlobalData();
  }, [globalFilters]);

  useEffect(() => {
    const getDataByCounry = async (country: string) => {
      const responseData = await requestCountryCases({
        country,
        ...filtersForLiveData,
      });

      return responseData;
    };

    setCountriesDataByDate({});

    selectedCountries.forEach(async (country) => {
      const response = await getDataByCounry(country);

      if (response.length) {
        setCountriesDataByDate((state) => appendToState(state, response));
      }
    });
  }, [selectedCountries, filtersForLiveData]);

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
