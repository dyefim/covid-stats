import { Switch, Route } from 'react-router-dom';
import { Countries } from '../types';
import {  GlobalFilters, FiltersForLiveData } from '../types/filters';
import World, { GlobalData } from './WorldPage';
import ByCountryAfterDate, { DataByCountry } from './ByCountryAfterDate';
import About from './About';
import useFiltersToSearchParams from '../hooks/useFiltersToSearchParams';

interface Props {
  globalData: GlobalData;
  globalFilters: GlobalFilters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
  countries: Countries;
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  countriesDataByDate: {
    [c: string]: DataByCountry[];
  };
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: React.Dispatch<
    React.SetStateAction<FiltersForLiveData>
  >;
}

const Routes = ({
  globalData,
  globalFilters,
  setGlobalFilters,
  countries,
  selectedCountries,
  setSelectedCountries,
  countriesDataByDate,
  filtersForLiveData,
  setFiltersForLiveData,
}: Props) => {
  useFiltersToSearchParams({
    globalFilters,
    filtersForLiveData,
    selectedCountries,
  });

  return (
    <Switch>
      <Route exact path="/">
        <World
          data={globalData}
          globalFilters={globalFilters}
          setGlobalFilters={setGlobalFilters}
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
        />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  );
};

export default Routes;
