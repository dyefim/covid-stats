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
import { caseOptions } from './hooks/events/useCaseTypeSelection';
import { GlobalFilters, FiltersForLiveData } from './types/filters';
import { CaseType, Countries } from './types';

const getInitialFilters = () => {
  const searchParams = new URLSearchParams(document.location.search);

  const isAcceptableCaseType = (caseType: string | null) =>
    caseType && caseOptions.includes(caseType);

  const caseTypeFromUrl = searchParams.get('cases');

  const initialCaseType = (
    isAcceptableCaseType(caseTypeFromUrl) ? caseTypeFromUrl : 'confirmed'
  ) as CaseType;

  return {
    date_from: searchParams.get('date_from') || jumpDays(-7),
    date_to: searchParams.get('date_to') || getTodayDate(),
    cases: initialCaseType,
  };
};

const App = () => {
  const countriesCollection = useCountries();
  const countries: Countries = collectionToObject(countriesCollection, 'Slug');

  const { selectedCountries, setSelectedCountries } = useSelectedCountries();

  const { date_from, date_to, cases } = getInitialFilters();

  const [globalFilters, setGlobalFilters] = useState<GlobalFilters>({
    date_from,
    date_to,
    cases,
  });

  const globalData = useGlobalData(globalFilters);

  const [filtersForLiveData, setFiltersForLiveData] =
    useState<FiltersForLiveData>({
      date_from,
      cases,
    });

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
