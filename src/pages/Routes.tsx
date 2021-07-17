import { Switch, Route } from 'react-router-dom';
import About from './About';
import ByCountryAfterDate, { DataByCountry } from './ByCountryAfterDate';
import World, { GlobalData } from './WorldPage';
import { Countries, GlobalFilters, FiltersForLiveData, CaseType } from '../App';

interface Props {
  globalData: GlobalData;
  globalFilters: GlobalFilters;
  setGlobalFilters: (filters: GlobalFilters) => void;
  typeOfCasesGlobal: CaseType;
  setTypeOfCasesGlobal: (caseType: CaseType) => void;
  typeOfCasesByCountry: CaseType;
  setTypeOfCasesByCountry: (caseType: CaseType) => void;
  countries: Countries;
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  countriesDataByDate: {
    [c: string]: DataByCountry[];
  };
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: (filters: FiltersForLiveData) => void;
}

const Routes = ({
  globalData,
  globalFilters,
  setGlobalFilters,
  typeOfCasesGlobal,
  setTypeOfCasesGlobal,
  typeOfCasesByCountry,
  setTypeOfCasesByCountry,
  countries,
  selectedCountries,
  setSelectedCountries,
  countriesDataByDate,
  filtersForLiveData,
  setFiltersForLiveData,
}: Props) => {
  return (
    <Switch>
      <Route exact path="/">
        <World
          data={globalData}
          globalFilters={globalFilters}
          setGlobalFilters={setGlobalFilters}
          typeOfCasesGlobal={typeOfCasesGlobal}
          setTypeOfCasesGlobal={setTypeOfCasesGlobal}
        />
      </Route>
      <Route path="/countries">
        <ByCountryAfterDate
          data={countriesDataByDate}
          countries={countries}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          filtersForLiveData={filtersForLiveData}
          setFiltersForLiveData={setFiltersForLiveData}
          typeOfCasesByCountry={typeOfCasesByCountry}
          setTypeOfCasesByCountry={setTypeOfCasesByCountry}
        />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  );
};

export default Routes;
