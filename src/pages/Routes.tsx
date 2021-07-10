import { Switch, Route } from 'react-router-dom';
import About from './About';
import ByCountryAfterDate, { DataByCountry } from './ByCountryAfterDate';
import World, { GlobalData } from './WorldPage';
import { Country, GlobalFilters, FiltersForLiveData } from '../App';

interface Props {
  globalData: GlobalData;
  globalFilters: GlobalFilters;
  setGlobalFilters: (filters: GlobalFilters) => void;
  countries: Country[];
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
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
        />
      </Route>
      <Route path="/by-country-after-date">
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
