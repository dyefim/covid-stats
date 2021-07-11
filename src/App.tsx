import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import { getTodayDate, jumpDays } from './utils/dates';
import collectionToObject from './utils/collectionToObject';
import Routes from './pages/Routes';
import useCountries from './hooks/useCountries';
import useSelectedCountries from './hooks/useSelectedCountries';
import useGlobalData from './hooks/useGlobalData';
import useCountriesData from './hooks/useCountriesData';

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

export interface Countries {
  [slug: string]: {
    Country: string;
    ISO2: string;
  };
}

const App = () => {
  const today = getTodayDate();
  const countriesCollection = useCountries();

  const countries: Countries = collectionToObject(countriesCollection, 'Slug');

  const { selectedCountries, setSelectedCountries } = useSelectedCountries();

  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    date_from: jumpDays(-7),
    date_to: today,
    typeOfCases: 'confirmed',
  });

  const [filtersForLiveData, setFiltersForLiveData] =
    useState<FiltersForLiveData>({
      date_from: jumpDays(-7),
      typeOfCases: 'confirmed',
    });

  const globalData = useGlobalData(globalFilters);

  const countriesDataByDate = useCountriesData({
    selectedCountries,
    filtersForLiveData,
  });

  return (
    <Container maxWidth="sm">
      {/* <header>СOVID Stats</header> */}
      <Router>
        <div>
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
        <Navigation />
      </Router>
    </Container>
  );
};

export default App;
