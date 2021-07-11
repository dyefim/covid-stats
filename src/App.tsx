import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
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
}

export interface FiltersForLiveData {
  date_from: string;
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
  });

  const [typeOfCasesGlobal, setTypeOfCasesGlobal] =
    useState<CaseType>('confirmed');

  const [typeOfCasesByCountry, setTypeOfCasesByCountry] =
    useState<CaseType>('confirmed');

  const [filtersForLiveData, setFiltersForLiveData] =
    useState<FiltersForLiveData>({
      date_from: jumpDays(-7),
    });

  const globalData = useGlobalData(globalFilters);

  const countriesDataByDate = useCountriesData({
    selectedCountries,
    filters: filtersForLiveData,
  });

  return (
    <Container maxWidth="md">
      <Router>
        <div>
          <Routes
            globalData={globalData}
            globalFilters={globalFilters}
            setGlobalFilters={setGlobalFilters}
            typeOfCasesGlobal={typeOfCasesGlobal}
            setTypeOfCasesGlobal={setTypeOfCasesGlobal}
            typeOfCasesByCountry={typeOfCasesByCountry}
            setTypeOfCasesByCountry={setTypeOfCasesByCountry}
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
